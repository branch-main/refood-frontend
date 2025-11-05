import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common";
import { FiStar, FiHeart } from "react-icons/fi";
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
          className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-base cursor-pointer px-5 py-2.5 rounded-lg mb-6 inline-flex items-center gap-2 transition-all font-semibold hover:bg-white/20 hover:-translate-x-1"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>

        <div className="flex gap-8 items-start flex-col md:flex-row">
          <div className="flex-shrink-0 w-full md:w-auto flex justify-center md:justify-start">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border-4 border-white/20 shadow-2xl">
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

          <div className="flex-1 pt-2 text-center md:text-left">
            <div className="flex items-start gap-3 mb-3 flex-wrap justify-center md:justify-start">
              {restaurant.is_premium && (
                <span className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  ⭐ Premium
                </span>
              )}
              {openStatus !== null && (
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 backdrop-blur-sm border shadow-lg ${
                    openStatus
                      ? "bg-green-500/90 text-white border-green-400"
                      : "bg-red-500/90 text-white border-red-400"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full animate-pulse ${openStatus ? "bg-white" : "bg-white"}`}
                  ></span>
                  {openStatus ? "Abierto ahora" : "Cerrado"}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold m-0 leading-tight mb-4 drop-shadow-lg">
              {restaurant.business_name}
            </h1>

            {restaurant.rating && (
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <FiStar className="text-xl md:text-2xl fill-yellow-400 text-yellow-400" />
                  <span className="text-xl md:text-2xl font-bold drop-shadow-md">
                    {formatRating(restaurant.rating)}
                  </span>
                </div>
                <span className="text-base md:text-lg opacity-90 drop-shadow-md">
                  ({restaurant.total_ratings} reseñas)
                </span>
              </div>
            )}

            <p className="text-base md:text-lg leading-relaxed mb-6 opacity-95 max-w-3xl">
              {restaurant.description}
            </p>

            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
              <Button
                onClick={onToggleFavorite}
                variant="secondary"
                className="!bg-white !text-[#B21F1F] hover:!bg-red-50 !shadow-lg hover:!shadow-xl !border-2 !border-[#B21F1F] !font-bold !py-3 !px-6 !rounded-xl transition-all flex items-center gap-2"
              >
                <FiHeart
                  className={`text-lg ${isFavorite ? "fill-[#B21F1F]" : ""}`}
                />
                {isFavorite ? "Guardado" : "Guardar Restaurante"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
