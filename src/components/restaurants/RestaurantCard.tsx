import { useNavigate } from "react-router-dom";
import { Card } from "../common";
import { formatDistance, formatRating } from "../../utils";
import { FiMapPin, FiStar } from "react-icons/fi";

export const RestaurantCard = ({ restaurant, compact = false }) => {
  const navigate = useNavigate();

  const getPlaceholderImage = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(restaurant.name)}&size=400&background=f3f4f6&color=1f2937&bold=true`;
  };

  return (
    <Card hover onClick={() => navigate(`/restaurants/${restaurant.id}`)}>
      <div className="flex flex-col h-full">
        <div
          className={`relative w-full ${compact ? "h-32" : "h-48"} rounded-t-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200`}
        >
          <img
            src={restaurant.logo || getPlaceholderImage()}
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              e.target.src = getPlaceholderImage();
            }}
          />
        </div>

        <div
          className={`flex-1 flex flex-col gap-2 ${compact ? "p-3" : "p-4"}`}
        >
          <h3
            className={`${compact ? "text-base" : "text-xl"} font-bold text-gray-900 m-0 leading-tight`}
          >
            {restaurant.name}
          </h3>
          {!compact && (
            <p className="text-gray-600 text-sm m-0 leading-relaxed overflow-hidden text-ellipsis line-clamp-2">
              {restaurant.description}
            </p>
          )}
          <div
            className={`flex flex-col ${compact ? "gap-1" : "gap-2"} text-gray-500 ${compact ? "text-xs" : "text-sm"} mt-auto`}
          >
            <span className="flex items-center gap-1.5 truncate">
              <FiMapPin className="flex-shrink-0" /> {restaurant.address}
            </span>
            {restaurant.distance && (
              <span className="text-[#B21F1F] font-semibold">
                {formatDistance(restaurant.distance)} de distancia
              </span>
            )}
          </div>

          {!compact && restaurant.stats && (
            <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
              <FiStar className="text-[#B21F1F] fill-[#B21F1F]" />
              <span className="text-[#B21F1F] font-bold text-base">
                {formatRating(restaurant.stats.rating)}
              </span>
              <span className="text-gray-400 text-sm">
                ({restaurant.stats.total_reviews} reseñas)
              </span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
