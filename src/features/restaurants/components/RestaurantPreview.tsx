import { Link } from "react-router-dom";
import { Restaurant } from "@/entities";
import { getFallbackImage } from "@/shared/utils";

export const RestaurantPreview = ({
  restaurant,
}: {
  restaurant: Restaurant;
}) => {
  return (
    <Link
      to={`/restaurants/${restaurant.id}`}
      className="flex flex-col items-center transition-transform duration-300 hover:scale-110"
    >
      <img
        src={getFallbackImage(restaurant.name, restaurant.logo)}
        alt={restaurant.name}
        className="min-w-20 max-w-20 min-h-20 max-h-20 rounded-full mb-4 shadow-md"
      />
      <span className="text-xs font-bold text-red-500">{restaurant.name}</span>
    </Link>
  );
};
