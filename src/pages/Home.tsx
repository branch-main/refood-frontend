import { Link } from "react-router-dom";
import { useRestaurants, useMenuByRestaurant } from "@/shared/hooks";
import { getFallbackImage, formatPrice, formatRating } from "@/shared/utils";
import { BsFillStarFill } from "react-icons/bs";
import { RiTimeLine, RiMotorbikeFill } from "react-icons/ri";
import { FiChevronRight, FiSearch } from "react-icons/fi";
import { IoMdHome } from "react-icons/io";
import { Restaurant } from "@/shared/types";
import { motion } from "framer-motion";

// Skeleton for Featured Restaurant
const FeaturedRestaurantSkeleton = () => (
  <div className="shrink-0 w-[380px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-32 bg-gray-200" />
    <div className="p-3">
      <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
      <div className="flex gap-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="shrink-0 w-[72px]">
            <div className="w-[68px] h-[68px] bg-gray-200 rounded-lg" />
            <div className="h-3 w-full bg-gray-200 rounded mt-1" />
            <div className="h-3 w-12 bg-gray-200 rounded mt-1" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Skeleton for Restaurant Card
const RestaurantCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-video bg-gray-200 rounded-lg" />
    <div className="flex justify-between items-center pt-2">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-200 rounded-full ml-1" />
        <div>
          <div className="h-4 w-32 bg-gray-200 rounded mb-1" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="w-14 h-6 bg-gray-200 rounded-lg" />
    </div>
  </div>
);

// Featured restaurant with menu items component
const FeaturedRestaurant = ({ restaurant }: { restaurant: Restaurant }) => {
  const { data: menuItems = [] } = useMenuByRestaurant(restaurant.id);
  
  // Get top 6 available menu items
  const topItems = menuItems
    .filter(item => item.isAvailable && item.categoryId)
    .slice(0, 6);

  return (
    <div className="shrink-0 w-[380px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Restaurant Header */}
      <Link to={`/restaurants/${restaurant.id}`} className="block">
        <div className="relative h-32">
          <img
            src={getFallbackImage(restaurant.name, restaurant.banner)}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="flex items-center gap-2">
              <img
                src={getFallbackImage(restaurant.name, restaurant.logo)}
                alt={restaurant.name}
                className="w-10 h-10 rounded-full border-2 border-white object-cover"
              />
              <div>
                <h3 className="font-bold text-white text-sm">{restaurant.name}</h3>
                <div className="flex items-center gap-1 text-white/80 text-xs">
                  <RiTimeLine className="w-3 h-3" />
                  <span>{restaurant.minPreparationTime}-{restaurant.maxPreparationTime} min</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-white rounded-full px-2 py-1">
              <BsFillStarFill className="w-3 h-3 fill-amber-500" />
              <span className="text-xs font-bold text-gray-800">{formatRating(restaurant.stats.rating)}</span>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Menu Items */}
      <div className="p-3">
        <p className="text-xs text-gray-500 mb-2 font-medium">Los más pedidos</p>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {topItems.map((item) => (
            <Link
              key={item.id}
              to={`/restaurants/${restaurant.id}`}
              className="shrink-0 w-[72px]"
            >
              <div className="relative p-0.5">
                <img
                  src={getFallbackImage(item.name, item.image)}
                  alt={item.name}
                  className="w-[68px] h-[68px] rounded-lg object-cover hover:ring-2 ring-red-500 transition-all"
                />
                {item.discountPrice && (
                  <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                    -{Math.round(((item.price - item.discountPrice) / item.price) * 100)}%
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-800 mt-1 line-clamp-1 font-medium">{item.name}</p>
              <p className="text-xs text-red-600 font-bold">
                {formatPrice(item.discountPrice || item.price)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Home = () => {
  const { data: allRestaurants = [], isLoading } = useRestaurants();

  // Top 10 restaurants by orders for featured section
  const featuredRestaurants = [...allRestaurants]
    .sort((a, b) => (b.stats?.totalOrders || 0) - (a.stats?.totalOrders || 0))
    .slice(0, 10);

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
    <div className="min-h-screen bg-neutral-50 pb-12">
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

            {/* Search Bar - Improved */}
            <Link
              to="/restaurants"
              className="group flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-md border border-gray-200 hover:shadow-lg hover:border-red-200 transition-all max-w-xl"
            >
              <div className="p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                <FiSearch className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-800 font-medium">¿Qué se te antoja hoy?</p>
                <p className="text-xs text-gray-400">Buscar restaurantes, comidas...</p>
              </div>
              <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Restaurants - Horizontal scroll */}
      {(isLoading || featuredRestaurants.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Destacados
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Los restaurantes más populares y sus platos estrella
              </p>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-4">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <FeaturedRestaurantSkeleton key={i} />
              ))
            ) : (
              featuredRestaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <FeaturedRestaurant restaurant={restaurant} />
                </motion.div>
              ))
            )}
          </div>
        </section>
      )}

      {/* Best Promotions */}
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
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <RestaurantCardSkeleton key={i} />
            ))
          ) : (
            bestPromotions.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Top Rated */}
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
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <RestaurantCardSkeleton key={i} />
            ))
          ) : (
            topRated.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Fastest Delivery */}
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
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <RestaurantCardSkeleton key={i} />
            ))
          ) : (
            fastest.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))
          )}
        </div>
      </section>

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
          {isLoading ? (
            [...Array(8)].map((_, i) => (
              <RestaurantCardSkeleton key={i} />
            ))
          ) : (
            displayRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
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
              </motion.div>
            ))
          )}
        </div>

        {!isLoading && allRestaurants.length > 12 && (
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

      {/* Partner CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                ¿Tienes un restaurante?
              </h2>
              <p className="text-gray-600 text-sm">
                Únete a ReFood y llega a miles de clientes hambrientos
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact?reason=partner"
                className="bg-red-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors text-sm text-center"
              >
                Solicitar asociación
              </Link>
              <Link
                to="/partner-info"
                className="border border-gray-300 text-gray-700 font-medium px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-sm text-center"
              >
                Más información
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
