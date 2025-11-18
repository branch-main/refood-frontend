import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { formatPrice } from "@/shared/utils";
import { Button } from "@/shared/components/ui";

export const FeaturedCarousel = ({ menuItems }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (menuItems.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % menuItems.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [menuItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % menuItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + menuItems.length) % menuItems.length);
  };

  const getPlaceholderImage = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=800&background=B21F1F&color=ffffff&bold=true`;
  };

  if (menuItems.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="relative bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg">
        <div className="relative h-[400px] md:h-[450px]">
          {menuItems.map((item, index) => {
            const discount = Math.round(
              ((item.price - item.price) / item.price) * 100,
            );

            return (
              <div
                key={item.id}
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
                      src={item.image || getPlaceholderImage(item.name)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = getPlaceholderImage(item.name);
                      }}
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent md:hidden"></div>
                    {discount > 0 && (
                      <div className="absolute top-4 right-4 bg-[#B21F1F] text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                        -{discount}%
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-center items-start p-6 md:p-8 gap-3 h-full min-h-0">
                    <div className="bg-red-100 text-[#B21F1F] px-3 py-1 rounded-full text-xs font-bold uppercase">
                      Oferta Especial
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                      {item.name}
                    </h3>

                    <p className="text-[#B21F1F] font-semibold text-base">
                      {item.restaurant_name}
                    </p>

                    <p className="text-gray-600 line-clamp-2 text-sm">
                      {item.description}
                    </p>

                    <div className="flex items-end gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Precio Original
                        </div>
                        <div className="text-lg text-gray-400 line-through">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">
                          Ahora Solo
                        </div>
                        <div className="text-3xl font-bold text-[#B21F1F]">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => navigate(`/menu/${item.id}`)}
                      size="medium"
                      className="mt-2"
                    >
                      Ver Oferta
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {menuItems.length > 1 && (
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

        {menuItems.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {menuItems.map((_, index) => (
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
