import { Restaurant } from "@/shared/types";
import { formatPrice, formatRating, getFallbackImage } from "@/shared/utils";
import { BsFillStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <Link to={`/restaurants/${restaurant.id}`}>
      <div className="rounded-xl overflow-hidden">
        <img
          alt={restaurant.name}
          src={getFallbackImage(restaurant.name, restaurant.banner)}
          className="w-full aspect-video object-cover"
        />
        <div className="mt-3 space-y-2">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800 line-clamp-1">
                {restaurant.name}
              </span>
              <div className="flex items-center rounded-lg gap-1 px-2 py-1 bg-amber-100">
                <BsFillStarFill className="fill-amber-500 w-3 h-3" />
                <span className="text-xs text-gray-800">
                  {formatRating(restaurant.stats.rating)}
                </span>
              </div>
            </div>
            <span className="text-sm text-green-500">Abierto</span>
          </div>

          <div className="h-px w-full bg-gray-200" />
          <div>
            <span className="text-sm text-gray-500">Estadísticas</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-800">Total de ventas</span>
            <span className="text-sm text-gray-800">
              {formatPrice(restaurant.stats.totalSales)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-800">Pedidos realizados</span>
            <span className="text-sm text-gray-800">
              {restaurant.stats.totalOrders}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-800">Productos vendidos</span>
            <span className="text-sm text-gray-800">
              {restaurant.stats.totalOrders}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
