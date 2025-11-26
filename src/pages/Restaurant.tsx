import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RestaurantMenu,
  RestaurantReviews,
  RestaurantMap,
  RestaurantContact,
  RestaurantDetail,
  RestaurantSchedule,
} from "@/features/restaurants/components";
import { useRestaurant, useCategories } from "@/shared/hooks";

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

const sidebarVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const Restaurant = () => {
  const { id } = useParams();
  const { isLoading, data: restaurant } = useRestaurant(Number(id));
  const { isLoading: isCategoriesLoading, data: categories } = useCategories(Number(id));

  if (isLoading || isCategoriesLoading) {
    return <Restaurant.Skeleton />;
  }

  if (!restaurant) {
    return <div>Restaurante no encontrado</div>;
  }

  const sortedCategories = categories?.slice().sort((a, b) => a.displayOrder - b.displayOrder) || [];

  return (
    <motion.div 
      className="flex-col"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="flex mb-8">
        <motion.div 
          className="hidden md:block w-72 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] rounded-br-xl overflow-hidden sticky top-14 h-fit"
          variants={sidebarVariants}
        >
          <RestaurantDetail restaurant={restaurant} />
          <RestaurantContact restaurant={restaurant} />
          <RestaurantSchedule restaurant={restaurant} />
        </motion.div>

        <motion.div 
          className="flex flex-col flex-1 gap-8 mx-8 mt-4"
          variants={containerVariants}
        >
          {sortedCategories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              custom={index}
            >
              <RestaurantMenu
                restaurantId={restaurant.id}
                category={category}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        className="flex flex-col-reverse md:flex-row gap-8 mx-8 mb-8"
        variants={containerVariants}
      >
        <motion.div className="flex-1" variants={itemVariants}>
          <RestaurantReviews restaurant={restaurant} />
        </motion.div>

        <motion.div className="w-full md:w-4/7" variants={itemVariants}>
          <RestaurantMap restaurant={restaurant} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

Restaurant.Skeleton = () => (
  <div className="flex-col">
    <div className="flex mb-8">
      <div className="hidden md:block w-72 shadow-xs rounded-br-xl overflow-hidden sticky top-14 h-fit">
        <RestaurantDetail.Skeleton />
        <RestaurantContact.Skeleton />
        <RestaurantSchedule.Skeleton />
      </div>

      <div className="flex flex-col flex-1 gap-8 mx-8 mt-4">
        <RestaurantMenu.Skeleton />
        <RestaurantMenu.Skeleton />
      </div>
    </div>

    <div className="flex flex-col-reverse md:flex-row gap-8 mx-8 mb-8">
      <div className="flex-1">
        <RestaurantReviews.Skeleton />
      </div>

      <div className="w-full md:w-4/7">
        <RestaurantMap.Skeleton />
      </div>
    </div>
  </div>
);
