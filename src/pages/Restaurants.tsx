import { useState } from "react";
import { SearchBar, Select } from "@/shared/components/common";
import {
  RestaurantCompact,
  RestaurantList,
  RestaurantCard,
} from "@/features/restaurants/components";
import { IoMdHome } from "react-icons/io";
import { useRestaurants } from "@/shared/hooks";
import { Skeleton } from "@/shared/components/ui";

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevancia" },
  { value: "featured", label: "Promociones" },
  { value: "rating", label: "Calificación" },
  { value: "delivery_time", label: "Tiempo de Entrega" },
  { value: "delivery_cost", label: "Costo de Envío" },
];

export const Restaurants = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const { isLoading: restaurantsLoading, data: restaurants } = useRestaurants();
  const { isLoading: trendingLoading, data: trending } = useRestaurants();

  return (
    <div className="pb-8">
      <div className="flex flex-col bg-red-50 w-full mb-8 px-4 pt-2 pb-4 gap-1">
        <span className="text-red-500 font-bold text-lg">
          Restaurantes cerca de mí
        </span>
        <div className="flex items-center gap-2 text-xs text-gray-800">
          <IoMdHome className="w-4 h-4" />
          <span>ReFood</span>
          <span>•</span>
          <span>Restaurantes cerca de mí</span>
        </div>
      </div>

      <div className="mx-auto px-6 md:px-4 flex flex-col gap-4">
        <div className="flex flex-col justify-between md:flex-row items-end md:items-center px-4 md:px-8 gap-8 md:gap-16">
          <div className="w-full md:max-w-1/2">
            <SearchBar
              placeholder="Buscar restaurantes..."
              value={search}
              onChange={setSearch}
            />
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
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mt-4">
          {trendingLoading && <Skeleton className="w-64 h-8 rounded-lg" />}
          {trending && <span>¡Los {trending.length} más elegidos!</span>}
        </h1>

        <div className="flex gap-8 overflow-x-auto py-4">
          {trendingLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <RestaurantCompact.Skeleton key={i} />
              ))
            : trending?.map((restaurant) => (
                <RestaurantCompact
                  key={restaurant.id}
                  restaurant={restaurant}
                />
              ))}
        </div>

        <h1 className="text-2xl font-bold text-gray-800">
          {restaurantsLoading && <Skeleton className="w-48 h-8 rounded-lg" />}
          {restaurants && (
            <span>Todos los restaurantes ({restaurants.length})</span>
          )}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {restaurantsLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <RestaurantCard.Skeleton key={i} />
              ))
            : restaurants && <RestaurantList restaurants={restaurants} />}
        </div>
      </div>
    </div>
  );
};
