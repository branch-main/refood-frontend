import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  RestaurantMenu,
  RestaurantReviews,
  RestaurantMap,
  RestaurantContact,
  RestaurantDetail,
  RestaurantSchedule,
} from "@/features/restaurants/components";
import { useRestaurantContext } from "@/features/restaurants/contexts";
import {
  useRestaurant,
  useCategories,
  useMenuByRestaurant,
} from "@/shared/hooks";

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
  const { isLoading: isCategoriesLoading, data: categories } = useCategories(
    Number(id),
  );
  const { data: menuItems } = useMenuByRestaurant(Number(id));
  const restaurantContext = useRestaurantContext();
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const categoryNavRef = useRef<HTMLDivElement>(null);

  const menuSearchQuery = restaurantContext?.menuSearchQuery || "";

  // Sort categories
  const sortedCategories = useMemo(() => {
    return (
      categories?.slice().sort((a, b) => a.displayOrder - b.displayOrder) || []
    );
  }, [categories]);

  // Filter categories that have items (when searching)
  const visibleCategories = useMemo(() => {
    if (!menuSearchQuery || !menuItems) return sortedCategories;

    const query = menuSearchQuery.toLowerCase();
    return sortedCategories.filter((category) => {
      const categoryItems = menuItems.filter(
        (item) =>
          item.categoryId === category.id &&
          item.isAvailable &&
          (item.name.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)),
      );
      return categoryItems.length > 0;
    });
  }, [sortedCategories, menuSearchQuery, menuItems]);

  // Calculate matched items count for search
  const matchedItemsCount = useMemo(() => {
    if (!menuSearchQuery || !menuItems) return 0;
    const query = menuSearchQuery.toLowerCase();
    return menuItems.filter(
      (item) =>
        item.isAvailable &&
        (item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)),
    ).length;
  }, [menuSearchQuery, menuItems]);

  // Set current restaurant context when viewing this page
  useEffect(() => {
    if (restaurant && restaurantContext) {
      restaurantContext.setCurrentRestaurant(restaurant);
    }

    // Clear context when leaving the page
    return () => {
      if (restaurantContext) {
        restaurantContext.setCurrentRestaurant(null);
      }
    };
  }, [restaurant, restaurantContext]);

  // Track scroll position to update active category
  useEffect(() => {
    if (!categories) return;

    const handleScroll = () => {
      const navbarHeight = 56;
      const categoryNavHeight = 52;
      const offset = navbarHeight + categoryNavHeight + 50;

      const sortedCats = categories
        .slice()
        .sort((a, b) => a.displayOrder - b.displayOrder);

      for (let i = sortedCats.length - 1; i >= 0; i--) {
        const element = document.getElementById(`category-${sortedCats[i].id}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset) {
            setActiveCategory(sortedCats[i].id);
            return;
          }
        }
      }

      // Default to first category if none is active
      if (sortedCats.length > 0) {
        setActiveCategory(sortedCats[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories]);

  // Scroll active category button into view (horizontal only)
  useEffect(() => {
    if (activeCategory && categoryNavRef.current) {
      const activeButton = categoryNavRef.current.querySelector(
        `[data-category-id="${activeCategory}"]`,
      ) as HTMLElement;
      if (activeButton) {
        const container = categoryNavRef.current;
        const buttonLeft = activeButton.offsetLeft;
        const buttonWidth = activeButton.offsetWidth;
        const containerWidth = container.offsetWidth;
        const scrollLeft = container.scrollLeft;

        // Check if button is out of view
        if (buttonLeft < scrollLeft) {
          container.scrollTo({ left: buttonLeft - 16, behavior: "smooth" });
        } else if (buttonLeft + buttonWidth > scrollLeft + containerWidth) {
          container.scrollTo({
            left: buttonLeft + buttonWidth - containerWidth + 16,
            behavior: "smooth",
          });
        }
      }
    }
  }, [activeCategory]);

  // Early returns after all hooks
  if (isLoading || isCategoriesLoading) {
    return <Restaurant.Skeleton />;
  }

  if (!restaurant) {
    return <div>Restaurante no encontrado</div>;
  }

  const handleClearSearch = () => {
    if (restaurantContext) {
      restaurantContext.setMenuSearchQuery("");
    }
  };

  const scrollToCategory = (categoryId: number) => {
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      const navbarHeight = 56;
      const categoryNavHeight = 48;
      const offset = navbarHeight + categoryNavHeight + 28;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      className="flex-col"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Search Results Banner */}
      {menuSearchQuery && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between bg-red-50 border-b border-red-100 px-8 py-3 mx-0"
        >
          <div className="flex items-center gap-3">
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
                "{menuSearchQuery}"
              </span>
            </span>
            <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
              {matchedItemsCount} resultado{matchedItemsCount !== 1 ? "s" : ""}
            </span>
          </div>
          <button
            onClick={handleClearSearch}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
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
            Limpiar búsqueda
          </button>
        </motion.div>
      )}

      <div className="flex mb-0">
        <motion.div
          className="hidden md:block w-72 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] rounded-br-xl overflow-hidden sticky top-14 h-fit"
          variants={sidebarVariants}
        >
          <RestaurantDetail restaurant={restaurant} />
          <RestaurantContact restaurant={restaurant} />
          <RestaurantSchedule restaurant={restaurant} />
        </motion.div>

        <motion.div
          className="flex flex-col flex-1 gap-4 mx-8"
          variants={containerVariants}
        >
          {/* Sticky Category Navigation - Menu area only */}
          {visibleCategories.length > 0 && (
            <div className="sticky top-14 z-40 -mx-8 px-8 py-2 bg-white backdrop-blur-sm border-b border-gray-100">
              <div
                ref={categoryNavRef}
                className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1"
              >
                {visibleCategories.map((category) => {
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      data-category-id={category.id}
                      onClick={() => scrollToCategory(category.id)}
                      className={`flex-shrink-0 px-3 py-1.5 text-sm font-medium rounded-full transition-all ${
                        isActive
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
                      }`}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* No Results Message */}
          {menuSearchQuery && matchedItemsCount === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
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
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-gray-500 mb-4 max-w-md">
                No hay platos que coincidan con "{menuSearchQuery}" en este
                restaurante.
              </p>
              <button
                onClick={handleClearSearch}
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Ver todo el menú
              </button>
            </motion.div>
          )}

          <div className="flex flex-col gap-8">
            {sortedCategories.map((category, index) => (
              <motion.div
                key={category.id}
                id={`category-${category.id}`}
                variants={itemVariants}
                custom={index}
              >
                <RestaurantMenu
                  restaurantId={restaurant.id}
                  category={category}
                />
              </motion.div>
            ))}
          </div>
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
