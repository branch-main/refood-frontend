import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsFillStarFill } from "react-icons/bs";
import { RiMotorbikeFill, RiTimeLine } from "react-icons/ri";
import { formatPrice, formatRating, getFallbackImage } from "../../../shared/utils";
import { Restaurant } from "../../../domain/entities/Restaurant";

interface RestaurantCarouselProps {
  restaurants: Restaurant[];
}

export const RestaurantCarousel = ({ restaurants }: RestaurantCarouselProps) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (restaurants.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % restaurants.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [restaurants.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % restaurants.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + restaurants.length) % restaurants.length
    );
  };

  if (restaurants.length === 0) return null;

  const currentRestaurant = restaurants[currentSlide];

  return (
    <div className="mb-6">
      <div className="relative bg-linear-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-md">
        <div className="relative h-[280px] md:h-[320px]">
          {restaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{
                pointerEvents: index === currentSlide ? "auto" : "none",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center">
                <div className="relative h-64 md:h-full min-h-0">
                  <img
                    src={getFallbackImage(
                      restaurant.name,
                      restaurant.banner
                    )}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent md:hidden"></div>
                </div>

                <div className="flex flex-col justify-center items-start p-4 md:p-6 gap-2 h-full min-h-0">
                  <div className="bg-red-100 text-[#B21F1F] px-2 py-0.5 rounded-full text-xs font-bold uppercase">
                    Recomendado
                  </div>

                  <h3 className="text-lg md:text-xl font-extrabold text-gray-900 leading-tight">
                    {restaurant.name}
                  </h3>

                  <p className="text-gray-600 line-clamp-1 text-xs">
                    {restaurant.description}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-gray-700">
                    <div className="flex items-center gap-1">
                      <RiTimeLine className="w-3 h-3 fill-gray-500" />
                      <span>5-10 min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <RiMotorbikeFill className="w-3 h-3 fill-gray-500" />
                      <span>{formatPrice(1.9)}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-100 px-1.5 py-0.5 rounded">
                      <BsFillStarFill className="fill-amber-500 w-2 h-2" />
                      <span className="font-bold text-xs text-gray-800">
                        {formatRating(restaurant.stats.rating)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                    className="mt-1 bg-[#B21F1F] text-white px-4 py-1 rounded text-sm font-semibold hover:bg-[#8B1616] transition-all"
                  >
                    Ver Menú
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {restaurants.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 z-10"
            >
              <FiChevronLeft className="text-2xl text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all hover:scale-110 z-10"
            >
              <FiChevronRight className="text-2xl text-gray-800" />
            </button>
          </>
        )}

        {restaurants.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {restaurants.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
