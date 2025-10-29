import { useNavigate } from "react-router-dom";
import { Card } from "../common";
import { formatDistance, formatRating } from "../../utils";

export const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <Card hover onClick={() => navigate(`/restaurants/${restaurant.id}`)}>
      <div className="flex gap-6 p-2 transition-all duration-300 hover:translate-x-1 md:flex-col md:gap-4">
        {restaurant.logo && (
          <div className="flex-shrink-0 w-[120px] h-[120px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center md:w-full md:h-[150px]">
            <img
              src={restaurant.logo}
              alt={restaurant.business_name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        <div className="flex-1 flex flex-col gap-3">
          <div className="flex justify-between items-start gap-4 md:flex-col md:items-start">
            <h3 className="text-2xl font-extrabold text-gray-900 m-0 leading-tight md:text-xl">
              {restaurant.business_name}
            </h3>
            {restaurant.is_premium && (
              <span className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap shadow-[0_2px_8px_rgba(251,191,36,0.3)]">
                ⭐ Premium
              </span>
            )}
          </div>

          <p className="text-gray-500 text-base m-0 leading-relaxed overflow-hidden text-ellipsis line-clamp-2">
            {restaurant.description}
          </p>

          <div className="flex flex-col gap-2 text-gray-500 text-[0.9375rem]">
            <span className="flex items-center gap-1.5 font-medium">
              📍 {restaurant.address}
            </span>
            {restaurant.distance && (
              <span className="text-[#B21F1F] font-semibold text-sm">
                {formatDistance(restaurant.distance)} de distancia
              </span>
            )}
          </div>

          {restaurant.rating && (
            <div className="flex items-center gap-3 pt-3 border-t border-gray-200 mt-auto">
              <span className="text-[#B21F1F] font-bold text-lg">
                ⭐ {formatRating(restaurant.rating)}
              </span>
              <span className="text-gray-400 text-sm">
                ({restaurant.total_ratings} reseñas)
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
