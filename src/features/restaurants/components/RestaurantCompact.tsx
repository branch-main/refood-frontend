import { Link } from "react-router-dom";
import { Restaurant } from "@/shared/types";
import { getFallbackImage } from "@/shared/utils";
import { Skeleton } from "@/shared/components/ui";

export const RestaurantCompact = ({
  restaurant,
}: {
  restaurant: Restaurant;
}) => {
  return (
    <Link
      to={`/restaurants/${restaurant.id}`}
      className="flex flex-col items-center shrink-0"
    >
      <div className="p-1">
        <img
          src={getFallbackImage(restaurant.name, restaurant.logo)}
          alt={restaurant.name}
          className="w-20 h-20 rounded-full shadow-md object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <span className="text-xs font-bold text-red-500 mt-2 text-center max-w-20 line-clamp-2">
        {restaurant.name}
      </span>
    </Link>
  );
};

RestaurantCompact.Skeleton = () => {
  return (
    <div className="flex flex-col items-center shrink-0">
      <div className="p-1">
        <Skeleton className="w-20 h-20 rounded-full" />
      </div>
      <Skeleton className="h-3 w-16 mt-2" />
    </div>
  );
};
