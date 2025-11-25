import { useParams } from "react-router-dom";
import {
  RestaurantMenu,
  RestaurantReviews,
  RestaurantMap,
  RestaurantContact,
  RestaurantDetail,
  RestaurantSchedule,
} from "@/features/restaurants/components";
import { useRestaurant, useCategories } from "@/shared/hooks";

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
    <div className="flex-col">
      <div className="flex mb-8">
        <div className="hidden md:block w-72 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] rounded-br-xl overflow-hidden sticky top-14 h-fit">
          <RestaurantDetail restaurant={restaurant} />
          <RestaurantContact restaurant={restaurant} />
          <RestaurantSchedule restaurant={restaurant} />
        </div>

        <div className="flex flex-col flex-1 gap-8 mx-8 mt-4">
          {sortedCategories.map((category) => (
            <RestaurantMenu
              key={category.id}
              restaurantId={restaurant.id}
              category={category}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row gap-8 mx-8 mb-8">
        <div className="flex-1">
          <RestaurantReviews restaurant={restaurant} />
        </div>

        <div className="w-full md:w-4/7">
          <RestaurantMap restaurant={restaurant} />
        </div>
      </div>
    </div>
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
