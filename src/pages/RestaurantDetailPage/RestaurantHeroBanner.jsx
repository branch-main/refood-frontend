import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common";
import { FiStar, FiHeart, FiArrowLeft } from "react-icons/fi";
import { formatRating } from "../../utils";

export const RestaurantHeroBanner = ({
  restaurant,
  openStatus,
  isFavorite,
  onToggleFavorite,
  getPlaceholderImage,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-br from-[#B21F1F] to-[#8B1616] text-white">
      {restaurant.logo && (
        <img
          src={restaurant.logo}
          alt={restaurant.business_name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      )}
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition-colors mb-6"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="text-xl" />
          <span className="font-medium">Volver</span>
        </button>

        <div className="flex gap-8 items-start flex-col md:flex-row">
          <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden bg-white shadow-xl border-4 border-white/20">
              <img
                src={restaurant.logo || getPlaceholderImage()}
                alt={restaurant.business_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = getPlaceholderImage();
                }}
              />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center gap-2 mb-3 flex-wrap justify-center md:justify-start">
              {restaurant.is_premium && (
                <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-md text-xs font-bold">
                  ⭐ Premium
                </span>
              )}
              {openStatus !== null && (
                <span
                  className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 ${
                    openStatus
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${openStatus ? "bg-white" : "bg-white"}`}
                  ></span>
                  {openStatus ? "Abierto" : "Cerrado"}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {restaurant.business_name}
            </h1>

            {restaurant.rating && (
              <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
                <div className="flex items-center gap-1.5">
                  <FiStar className="text-lg fill-yellow-400 text-yellow-400" />
                  <span className="text-xl font-bold">
                    {formatRating(restaurant.rating)}
                  </span>
                </div>
                <span className="text-base opacity-90">
                  ({restaurant.total_ratings} reseñas)
                </span>
              </div>
            )}

            <p className="text-base leading-relaxed mb-6 opacity-95 max-w-2xl">
              {restaurant.description}
            </p>

            <Button
              onClick={onToggleFavorite}
              variant="secondary"
              className="!bg-white !text-[#B21F1F] hover:!bg-gray-100 !font-semibold !py-2.5 !px-5 !rounded-lg !transition-colors !inline-flex !items-center !gap-2"
            >
              <FiHeart
                className={`text-base ${isFavorite ? "fill-[#B21F1F]" : ""}`}
              />
              {isFavorite ? "Guardado" : "Guardar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
