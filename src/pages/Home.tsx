import { useState } from "react";
import { Link } from "react-router-dom";
import { useRestaurants } from "@/shared/hooks";
import { getFallbackImage, formatPrice, formatRating } from "@/shared/utils";
import { BsFillStarFill } from "react-icons/bs";
import { RiTimeLine, RiMotorbikeFill } from "react-icons/ri";
import { FiChevronRight, FiSearch } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";

export const Home = () => {
  const { data: allRestaurants = [] } = useRestaurants();

  // Top rated restaurants
  const topRated = [...allRestaurants]
    .sort((a, b) => (b.stats?.rating || 0) - (a.stats?.rating || 0))
    .slice(0, 4);

  // Best promotions (with best discounts)
  const bestPromotions = [...allRestaurants]
    .filter((r) => r.bestDiscount && r.bestDiscount > 0)
    .sort((a, b) => (b.bestDiscount || 0) - (a.bestDiscount || 0))
    .slice(0, 4);

  // Fastest delivery
  const fastest = [...allRestaurants]
    .sort((a, b) => {
      const avgA = (a.minPreparationTime + a.maxPreparationTime) / 2;
      const avgB = (b.minPreparationTime + b.maxPreparationTime) / 2;
      return avgA - avgB;
    })
    .slice(0, 4);

  // All restaurants
  const displayRestaurants = allRestaurants.slice(0, 12);

  const RestaurantCard = ({ restaurant }: { restaurant: any }) => (
    <Link
      to={`/restaurants/${restaurant.id}`}
      className="transition-transform duration-300 hover:scale-105"
    >
      <div className="flex flex-col h-full">
        <div className="relative aspect-video">
          <img
            src={getFallbackImage(restaurant.name, restaurant.banner)}
            alt={restaurant.name}
            className="w-full h-full object-cover rounded-lg"
          />
          {restaurant.bestDiscount > 0 && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
              {restaurant.bestDiscount}% OFF
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 pt-2">
            <div className="flex flex-1 gap-2">
              <img
                src={getFallbackImage(restaurant.name, restaurant.logo)}
                alt={restaurant.name}
                className="w-8 h-8 rounded-full object-cover ml-1"
              />

              <div className="flex-1 text-gray-800 text-xs">
                <h3 className="text-base font-bold line-clamp-1">
                  {restaurant.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <RiTimeLine className="w-3 h-3 fill-gray-500" />
                    {restaurant.minPreparationTime} -{" "}
                    {restaurant.maxPreparationTime} min
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="flex items-center gap-1">
                    <RiMotorbikeFill className="w-3 h-3 fill-gray-500" />
                    {formatPrice(1.9)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center rounded-lg gap-1 px-2 py-1 bg-amber-100">
            <BsFillStarFill className="fill-amber-500 w-3 h-3" />
            <span className="font-bold text-xs text-gray-800">
              {formatRating(restaurant.stats.rating)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-white pb-12">
      {/* Hero Section */}
      <div className="bg-red-50 border-b border-red-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
              <IoMdHome className="w-4 h-4" />
              <span>ReFood</span>
              <span>•</span>
              <span>Inicio</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tu comida favorita,
              <br />
              <span className="text-red-600">entregada rápido</span>
            </h1>

            <p className="text-lg text-gray-600 mb-8">
              Descubre los mejores restaurantes cerca de ti. Ordena ahora y
              disfruta en minutos.
            </p>

            {/* Search Bar */}
            <Link
              to="/restaurants"
              className="flex items-center gap-3 bg-white rounded-lg px-4 py-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow max-w-xl"
            >
              <FiSearch className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400 text-sm flex-1">
                Buscar restaurantes, comidas...
              </span>
              <FiChevronRight className="w-5 h-5 text-gray-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Best Promotions */}
      {bestPromotions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Mejores promociones
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Los mejores descuentos disponibles
              </p>
            </div>
            <Link
              to="/restaurants?sort=featured"
              className="text-red-600 font-semibold text-sm hover:text-red-700 flex items-center gap-1"
            >
              Ver todo
              <FiChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bestPromotions.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      )}

      {/* Top Rated */}
      {topRated.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Mejor calificados
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Los favoritos de nuestros clientes
              </p>
            </div>
            <Link
              to="/restaurants?sort=rating"
              className="text-red-600 font-semibold text-sm hover:text-red-700 flex items-center gap-1"
            >
              Ver todo
              <FiChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {topRated.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      )}

      {/* Fastest Delivery */}
      {fastest.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Más rápidos
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Entrega en tiempo récord
              </p>
            </div>
            <Link
              to="/restaurants?sort=delivery"
              className="text-red-600 font-semibold text-sm hover:text-red-700 flex items-center gap-1"
            >
              Ver todo
              <FiChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fastest.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      )}

      {/* All Restaurants */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Todos los restaurantes
          </h2>
          <p className="text-sm text-gray-600">
            Encuentra tu comida favorita
          </p>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayRestaurants.map((restaurant) => (
            <div key={restaurant.id} className="w-full">
              <Link
                to={`/restaurants/${restaurant.id}`}
                className="transition-transform duration-300 hover:scale-105 block"
              >
                <div className="flex flex-col h-full">
                  <div className="relative aspect-video">
                    <img
                      src={getFallbackImage(restaurant.name, restaurant.banner)}
                      alt={restaurant.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {restaurant.bestDiscount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        {restaurant.bestDiscount}% OFF
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 pt-2">
                      <div className="flex flex-1 gap-2">
                        <img
                          src={getFallbackImage(restaurant.name, restaurant.logo)}
                          alt={restaurant.name}
                          className="w-8 h-8 rounded-full object-cover ml-1"
                        />

                        <div className="flex-1 text-gray-800 text-xs">
                          <h3 className="text-base font-bold line-clamp-1">
                            {restaurant.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1">
                              <RiTimeLine className="w-3 h-3 fill-gray-500" />
                              {restaurant.minPreparationTime} -{" "}
                              {restaurant.maxPreparationTime} min
                            </span>
                            <span className="text-gray-500">•</span>
                            <span className="flex items-center gap-1">
                              <RiMotorbikeFill className="w-3 h-3 fill-gray-500" />
                              {formatPrice(1.9)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center rounded-lg gap-1 px-2 py-1 bg-amber-100">
                      <BsFillStarFill className="fill-amber-500 w-3 h-3" />
                      <span className="font-bold text-xs text-gray-800">
                        {formatRating(restaurant.stats.rating)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {allRestaurants.length > 12 && (
          <div className="mt-8 text-center">
            <Link
              to="/restaurants"
              className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700"
            >
              Ver todos los restaurantes
              <FiChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};
