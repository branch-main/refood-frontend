import { useNavigate } from "react-router-dom";
import { Card } from "../common";
import { formatDistance, formatRating } from "../../utils";

export const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  const getPlaceholderImage = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(restaurant.business_name)}&size=400&background=f3f4f6&color=1f2937&bold=true`;
  };

  return (
    <Card hover onClick={() => navigate(`/restaurants/${restaurant.id}`)}>
      <div className="flex flex-col h-full">
        <div className="relative w-full h-48 rounded-t-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <img
            src={restaurant.logo || getPlaceholderImage()}
            alt={restaurant.business_name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              e.target.src = getPlaceholderImage();
            }}
          />
          {restaurant.is_premium && (
            <span className="absolute top-3 right-3 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg">
              ⭐ Premium
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col gap-3 p-4">
          <h3 className="text-xl font-bold text-gray-900 m-0 leading-tight">
            {restaurant.business_name}
          </h3>

          <p className="text-gray-600 text-sm m-0 leading-relaxed overflow-hidden text-ellipsis line-clamp-2">
            {restaurant.description}
          </p>

          <div className="flex flex-col gap-2 text-gray-500 text-sm mt-auto">
            <span className="flex items-center gap-1.5">
              📍 {restaurant.address}
            </span>
            {restaurant.distance && (
              <span className="text-[#B21F1F] font-semibold">
                {formatDistance(restaurant.distance)} de distancia
              </span>
            )}
          </div>

          {restaurant.rating && (
            <div className="flex items-center gap-3 pt-3 border-t border-gray-200">
              <span className="text-[#B21F1F] font-bold text-base">
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
