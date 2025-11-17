import { Link } from "react-router-dom";
import {
  formatPrice,
  formatRating,
  getFallbackImage,
} from "../../../shared/utils";
import { Restaurant } from "../../../domain/entities/Restaurant";
import { BsFillStarFill } from "react-icons/bs";
import { RiMotorbikeFill, RiTimeLine } from "react-icons/ri";

export const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link
      to={`/restaurants/${restaurant.id}`}
      className="transition-transform duration-300 hover:scale-105"
    >
      <div className="flex flex-col h-full">
        <img
          src={getFallbackImage(restaurant.name, restaurant.banner)}
          alt={restaurant.name}
          className="aspect-video object-cover rounded-lg"
        />

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
                    5-10 min
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
};
