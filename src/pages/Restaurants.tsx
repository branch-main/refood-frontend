import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Select } from "@/shared/components/common";
import {
  RestaurantCompact,
  RestaurantList,
  RestaurantCard,
} from "@/features/restaurants/components";
import { IoMdHome } from "react-icons/io";
import { useRestaurants } from "@/shared/hooks";
import { Skeleton } from "@/shared/components/ui";
import { Restaurant } from "@/shared/types";
import { motion } from "framer-motion";

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevancia" },
  { value: "featured", label: "Promociones" },
  { value: "rating", label: "Calificación" },
  { value: "delivery_time", label: "Tiempo de Entrega" },
];

const sortRestaurants = (
  restaurants: Restaurant[] | undefined,
  sortBy: string,
): Restaurant[] => {
  if (!restaurants) return [];

  const sorted = [...restaurants];

  switch (sortBy) {
    case "featured":
      return sorted.sort((a, b) => {
        return (b.bestDiscount || 0) - (a.bestDiscount || 0);
      });

    case "rating":
      return sorted.sort((a, b) => {
        const ratingA = a.stats?.rating || 0;
        const ratingB = b.stats?.rating || 0;
        return ratingB - ratingA;
      });

    case "delivery_time":
      return sorted.sort((a, b) => {
        const avgA = (a.minPreparationTime + a.maxPreparationTime) / 2;
        const avgB = (b.minPreparationTime + b.maxPreparationTime) / 2;
        return avgA - avgB;
      });

    case "relevance":
      return sorted.sort((a, b) => {
        const ordersA = a.stats?.totalOrders || 0;
        const ordersB = b.stats?.totalOrders || 0;
        return ordersB - ordersA;
      });

    default:
      return sorted;
  }
};

export const Restaurants = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const searchQuery = searchParams.get("search") || "";
  const [search, setSearch] = useState(searchQuery);
  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  const { isLoading: restaurantsLoading, data: restaurantsData } =
    useRestaurants(searchQuery);
  const { isLoading: trendingLoading, data: trending } = useRestaurants();

  const restaurants = sortRestaurants(restaurantsData, sortBy);
  const topRestaurants =
    sortRestaurants(trending, "relevance")?.slice(0, 10) || [];

  return (
    <div className="pb-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col bg-red-50 w-full mb-8 px-4 pt-2 pb-4 gap-1"
      >
        <span className="text-red-500 font-bold text-lg">
          {searchQuery
            ? `Resultados de búsqueda: "${searchQuery}"`
            : "Restaurantes cerca de mí"}
        </span>
        <div className="flex items-center gap-2 text-xs text-gray-800">
          <IoMdHome className="w-4 h-4" />
          <span>ReFood</span>
          <span>•</span>
          <span>{searchQuery ? "Búsqueda" : "Restaurantes cerca de mí"}</span>
        </div>
      </motion.div>

      <div className="mx-auto px-6 flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col justify-between md:flex-row items-end md:items-center gap-4 md:gap-8"
        >
          <div className="w-full md:max-w-1/2 flex items-center gap-3">
            {searchQuery ? (
              <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border border-red-100">
                <svg
                  className="w-5 h-5 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-sm text-gray-700">
                  Buscando:{" "}
                  <span className="font-semibold text-gray-900">
                    "{searchQuery}"
                  </span>
                </span>
                <button
                  onClick={() => navigate("/restaurants")}
                  className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
                <span className="text-sm font-medium">
                  {restaurants?.length || 0} restaurantes disponibles
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-800 text-sm font-bold whitespace-nowrap">
              Ordenar por:
            </span>
            <Select
              options={SORT_OPTIONS}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-2xl font-bold text-gray-800 mt-4"
        >
          {trendingLoading && <Skeleton className="w-64 h-8 rounded-lg" />}
          {trending && <span>¡Los más elegidos!</span>}
        </motion.h1>

        <div className="flex gap-8 overflow-x-auto py-6">
          {trendingLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <RestaurantCompact.Skeleton key={i} />
              ))
            : topRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <RestaurantCompact restaurant={restaurant} />
                </motion.div>
              ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="text-2xl font-bold text-gray-800"
        >
          {restaurantsLoading && <Skeleton className="w-48 h-8 rounded-lg" />}
          {restaurants && (
            <span>
              {searchQuery
                ? `${restaurants.length} resultado${restaurants.length !== 1 ? "s" : ""} encontrado${restaurants.length !== 1 ? "s" : ""}`
                : `Todos los restaurantes (${restaurants.length})`}
            </span>
          )}
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {restaurantsLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <RestaurantCard.Skeleton key={i} />
              ))
            : restaurants?.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                >
                  <RestaurantCard restaurant={restaurant} />
                </motion.div>
              ))}
        </div>
      </div>
    </div>
  );
};
