import { useFavorites, useRestaurant } from "@/shared/hooks";
import { Link } from "react-router-dom";
import { Skeleton } from "@/shared/components/ui";
import { RestaurantCard } from "@/features/restaurants/components";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const _Restaurant = ({ id, index }: { id: number; index: number }) => {
  const { data: restaurant, isLoading } = useRestaurant(id);
  
  if (isLoading) {
    return <RestaurantCard.Skeleton />;
  }
  
  if (!restaurant) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <RestaurantCard restaurant={restaurant} />
    </motion.div>
  );
};

const FavoritesSkeleton = () => (
  <div className="p-4 sm:p-6 lg:p-8">
    <div className="mb-6">
      <Skeleton className="h-8 w-48 mb-2" />
      <Skeleton className="h-4 w-full max-w-md" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <RestaurantCard.Skeleton key={i} />
      ))}
    </div>
  </div>
);

export const Favorites = () => {
  const { data: favorites, isLoading, error } = useFavorites();

  if (error) {
    console.error("Error loading favorites:", error);
  }

  if (isLoading) {
    return <FavoritesSkeleton />;
  }

  return (
    <motion.div 
      className="p-4 sm:p-6 lg:p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mis favoritos</h1>
        <p className="mt-1 text-sm text-gray-500">
          Aquí encontrarás todos los restaurantes que has marcado como favoritos
          para acceder rápidamente a ellos.
        </p>
      </motion.div>

      {favorites?.length === 0 ? (
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-8 sm:p-12"
        >
          <div className="text-center max-w-sm mx-auto">
            <div className="w-16 h-16 mx-auto mb-4 bg-pink-50 rounded-2xl flex items-center justify-center">
              <FiHeart className="w-8 h-8 text-pink-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              No tienes favoritos aún
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Explora restaurantes y guarda tus favoritos con un clic en el
              corazón
            </p>
            <Link
              to="/restaurants"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-red-500 text-white text-sm rounded-xl hover:bg-red-600 transition-colors font-medium"
            >
              Explorar restaurantes
            </Link>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {favorites?.map((restaurantId, index) => (
            <_Restaurant key={restaurantId} id={restaurantId} index={index} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
