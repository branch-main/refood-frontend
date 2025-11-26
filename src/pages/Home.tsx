import { Link } from "react-router-dom";
import { useRestaurants, useMenuByRestaurant } from "@/shared/hooks";
import { getFallbackImage, formatPrice, formatRating } from "@/shared/utils";
import { BsFillStarFill, BsArrowRight } from "react-icons/bs";
import { RiTimeLine, RiMotorbikeFill, RiFireFill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { Restaurant } from "@/shared/types";
import { motion } from "framer-motion";

// Skeleton for Featured Restaurant
const FeaturedRestaurantSkeleton = () => (
  <div className="shrink-0 w-[320px] md:w-[380px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-40 bg-gray-200" />
    <div className="p-4">
      <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
      <div className="flex gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="shrink-0 w-[80px]">
            <div className="w-[80px] h-[80px] bg-gray-200 rounded-xl" />
            <div className="h-3 w-full bg-gray-200 rounded mt-2" />
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
    <div className="group shrink-0 w-[320px] md:w-[380px] bg-white rounded-2xl shadow-[0_2px_12px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden transition-all duration-300">
      {/* Restaurant Header */}
      <Link to={`/restaurants/${restaurant.id}`} className="block relative h-40 overflow-hidden">
        <img
          src={getFallbackImage(restaurant.name, restaurant.banner)}
          alt={restaurant.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end justify-between">
            <div className="flex items-center gap-3">
              <img
                src={getFallbackImage(restaurant.name, restaurant.logo)}
                alt={restaurant.name}
                className="w-12 h-12 rounded-xl border-2 border-white shadow-md object-cover bg-white"
              />
              <div className="text-white">
                <h3 className="font-bold text-lg leading-tight">{restaurant.name}</h3>
                <div className="flex items-center gap-2 text-xs text-white/90 mt-0.5">
                  <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    <RiTimeLine className="w-3 h-3" />
                    {restaurant.minPreparationTime}-{restaurant.maxPreparationTime} min
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-amber-400 text-white px-2 py-1 rounded-lg shadow-sm">
              <BsFillStarFill className="w-3 h-3" />
              <span className="text-xs font-bold">{formatRating(restaurant.stats.rating)}</span>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Menu Items */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Populares</p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {topItems.map((item) => (
            <Link
              key={item.id}
              to={`/restaurants/${restaurant.id}`}
              className="shrink-0 w-[84px] group/item"
            >
              <div className="relative mb-2">
                <img
                  src={getFallbackImage(item.name, item.image)}
                  alt={item.name}
                  className="w-[84px] h-[84px] rounded-xl object-cover shadow-sm group-hover/item:shadow-md transition-all"
                />
                {item.discountPrice && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
                    -{Math.round(((item.price - item.discountPrice) / item.price) * 100)}%
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-700 font-medium line-clamp-1 group-hover/item:text-red-600 transition-colors">{item.name}</p>
              <p className="text-xs font-bold text-gray-900">
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

  const SectionHeader = ({ title, subtitle, link }: { title: string, subtitle: string, link?: string }) => (
    <div className="flex items-end justify-between mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          {title}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {subtitle}
        </p>
      </div>
      {link && (
        <Link
          to={link}
          className="group flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors bg-red-50 px-3 py-1.5 rounded-full hover:bg-red-100"
        >
          Ver todo
          <BsArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 via-white to-orange-50/30" />
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight"
            >
              Comida deliciosa, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                en tu puerta
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Explora los mejores restaurantes de tu zona. Desde clásicos locales hasta joyas ocultas, todo a un clic de distancia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/restaurants"
                className="group relative inline-flex items-center gap-4 bg-white rounded-2xl px-4 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 transition-all w-full max-w-lg mx-auto text-left"
              >
                <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl text-white shadow-lg shadow-red-200">
                  <FiSearch className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">¿Qué te provoca hoy?</p>
                  <p className="text-xs text-gray-500">Buscar restaurantes, platos...</p>
                </div>
                <div className="pr-2">
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-50 group-hover:text-red-500 transition-colors">
                    <BsArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Featured Restaurants - Horizontal scroll */}
      {(isLoading || featuredRestaurants.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
          <SectionHeader 
            title="Destacados" 
            subtitle="Los restaurantes más populares y sus platos estrella"
          />

          <div className="flex gap-6 overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
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
        <SectionHeader 
          title="Mejores promociones" 
          subtitle="Aprovecha los descuentos exclusivos"
          link="/restaurants?sort=featured"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <SectionHeader 
          title="Mejor calificados" 
          subtitle="Los favoritos de la comunidad"
          link="/restaurants?sort=rating"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <SectionHeader 
          title="Más rápidos" 
          subtitle="Entrega flash en minutos"
          link="/restaurants?sort=delivery"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <SectionHeader 
          title="Todos los restaurantes" 
          subtitle="Explora todas las opciones disponibles"
        />

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            [...Array(8)].map((_, i) => (
              <RestaurantCardSkeleton key={i} />
            ))
          ) : (
            displayRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                className="w-full h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))
          )}
        </div>

        {!isLoading && allRestaurants.length > 12 && (
          <div className="mt-12 text-center">
            <Link
              to="/restaurants"
              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              Ver todos los restaurantes
              <BsArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </section>

      {/* Partner CTA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="relative bg-gray-900 rounded-3xl overflow-hidden p-8 md:p-12">
          {/* Abstract Background Pattern */}
          <div className="absolute inset-0 bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" />
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-red-900/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-orange-900/30 rounded-full blur-3xl" />
          </div>
          
          <div className="relative z-20 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Tienes un restaurante?
              </h2>
              <p className="text-gray-300 text-lg">
                Únete a ReFood y haz crecer tu negocio llegando a miles de nuevos clientes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                to="/contact?reason=partner"
                className="bg-red-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 text-center"
              >
                Solicitar asociación
              </Link>
              <Link
                to="/partner-info"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-all text-center"
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
