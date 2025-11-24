import { useNavigate } from "react-router-dom";
import { FiStar, FiHeart, FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import {
  formatPrice,
  formatRating,
  formatTime,
  getFallbackImage,
} from "@/shared/utils";
import { Restaurant } from "@/shared/types";
import { Skeleton } from "@/shared/components/ui";
import { useFavorites, useAddFavorite, useRemoveFavorite } from "@/shared/hooks";

export const RestaurantDetail = ({
  restaurant,
}: {
  restaurant: Restaurant;
}) => {
  const navigate = useNavigate();
  const { data: favorites = [], error } = useFavorites();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  
  // Log error but don't break the UI
  if (error) {
    console.error("Error loading favorites:", error);
  }
  
  const isFavorite = favorites.includes(restaurant.id);
  const [isToggling, setIsToggling] = useState(false);

  const handleToggleFavorite = async () => {
    if (isToggling) return;
    
    setIsToggling(true);
    try {
      if (isFavorite) {
        await removeFavorite.mutateAsync(restaurant.id);
      } else {
        await addFavorite.mutateAsync(restaurant.id);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsToggling(false);
    }
  };

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
          className={`absolute w-8 h-8 top-2 right-2 flex items-center justify-center transition-all bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/75 disabled:opacity-50 ${
            isFavorite ? "text-red-500" : "text-white"
          }`}
          onClick={handleToggleFavorite}
          disabled={isToggling}
        >
          <FiHeart
            className={`h-4 w-4 transition-all ${isFavorite ? "fill-current" : ""}`}
          />
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
              <span className="font-bold text-gray-800 mr-1">
                {restaurant.minPreparationTime} -{" "}
                {restaurant.maxPreparationTime} min
              </span>
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

RestaurantDetail.Skeleton = () => {
  return (
    <div className="bg-white">
      <div className="relative aspect-video overflow-visible">
        <Skeleton className="w-full h-full" />

        <div className="absolute left-12 -translate-x-1/2 -bottom-8">
          <Skeleton className="w-16 h-16 rounded-full" />
        </div>

        <Skeleton className="absolute right-3 -bottom-10 w-20 h-8 rounded-lg" />
      </div>

      <div className="p-4 mt-8">
        <Skeleton className="h-8 w-3/4 mb-1" />
        <Skeleton className="h-4 w-full mb-4" />

        <div className="w-full border border-gray-200 rounded-2xl">
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex justify-between items-center px-4 py-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};
