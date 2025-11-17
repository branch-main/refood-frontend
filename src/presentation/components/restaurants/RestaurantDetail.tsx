import { useNavigate } from "react-router-dom";
import { FiStar, FiHeart, FiArrowLeft } from "react-icons/fi";
import {
  formatPrice,
  formatRating,
  formatTime,
  getFallbackImage,
} from "../../../shared/utils";
import { Restaurant } from "../../../domain/entities/Restaurant";

export const RestaurantDetail = ({
  restaurant,
}: {
  restaurant: Restaurant;
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white">
      <div className="relative aspect-video overflow-visible">
        <img
          src={getFallbackImage(restaurant.name, restaurant.banner)}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 p-2 bg-black/50" />

        <button
          className="absolute w-8 h-8 top-2 left-2 flex items-center justify-center transition-colors bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/75"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="h-4 w-4 text-white" />
        </button>

        <button
          className="absolute w-8 h-8 top-2 right-2 flex items-center justify-center transition-colors bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/75"
          onClick={() => navigate(-1)}
        >
          <FiHeart className="h-4 w-4 text-white" />
        </button>

        <div className="absolute left-12 -translate-x-1/2 -bottom-8 w-16 h-16 rounded-full bg-white shadow-lg">
          <img
            src={getFallbackImage(restaurant.name, restaurant.logo)}
            alt={restaurant.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {(restaurant.isOpen && (
          <span className="absolute right-3 -bottom-10 text-green-600 bg-green-100 font-bold px-2 py-1 rounded-lg text-sm">
            Abierto
          </span>
        )) || (
          <span className="absolute right-3 -bottom-10 text-amber-600 bg-orange-100 font-bold px-2 py-1 rounded-lg text-sm">
            Abre {formatTime(restaurant.nextOpeningTime)}
          </span>
        )}
      </div>

      <div className="p-4 mt-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          {restaurant.name}
        </h1>

        <p className="text-xs text-gray-800 mb-4 line-clamp-2 leading-relaxed">
          {restaurant.description}
        </p>

        <div className="flex flex-col items-center gap-4">
          <div className="w-full border border-gray-200 rounded-2xl text-sm">
            <div className="flex justify-between items-center px-4 py-2 border-b last:border-0 border-gray-200">
              <span className="text-gray-500">Tiempo estimado</span>
              <span className="font-bold text-gray-800 mr-1">15-20 min</span>
            </div>

            <div className="flex justify-between items-center px-4 py-2 border-b last:border-0 border-gray-200">
              <span className="text-gray-500">Costo de envío</span>
              <span className="font-bold text-gray-800 mr-1">
                {formatPrice(1.9)}
              </span>
            </div>

            <div className="flex justify-between items-center px-4 py-2 border-b last:border-0 border-gray-200">
              <span className="text-gray-500">Calificación</span>
              <span className="flex items-center">
                <FiStar className="fill-amber-500 text-amber-500 text-sm mr-2" />
                <span className="font-bold text-gray-800 mr-1">
                  {formatRating(restaurant.stats.rating)}
                </span>
                <span className="text-gray-500">
                  ({restaurant.stats.totalReviews})
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
