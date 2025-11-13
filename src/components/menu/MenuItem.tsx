import { useNavigate } from "react-router-dom";
import { Card } from "../common";
import { formatPrice, calculateDiscount } from "../../utils";
import { FiHome } from "react-icons/fi";

export const MenuItem = ({ item }) => {
  const navigate = useNavigate();
  const discount = calculateDiscount(item.price, item.discounted_price);

  const getPlaceholderImage = () => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&size=400&background=B21F1F&color=ffffff&bold=true`;
  };

  return (
    <Card
      hover
      onClick={() => navigate(`/menu/${item.id}`)}
      className="overflow-hidden"
    >
      <div className="flex flex-col h-full transition-all duration-300 hover:-translate-y-1">
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={item.image || getPlaceholderImage()}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={(e) => {
              e.target.src = getPlaceholderImage();
            }}
          />
          {discount > 0 && (
            <div className="absolute top-3 right-3 bg-[#B21F1F] text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-lg backdrop-blur-sm">
              -{discount}%
            </div>
          )}
          <div
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${
              item.quantity > 0
                ? "bg-green-500/90 text-white"
                : "bg-gray-500/90 text-white"
            }`}
          >
            {item.quantity > 0 ? "Disponible" : "Agotado"}
          </div>
        </div>

        <div className="flex-1 flex flex-col p-4 gap-3">
          <h3 className="text-lg font-bold text-gray-900 m-0 leading-tight line-clamp-2 hover:text-[#B21F1F] transition-colors">
            {item.name}
          </h3>

          {item.restaurant_info && (
            <div className="flex items-center gap-1.5 text-gray-600 text-sm">
              <FiHome className="text-[#B21F1F] flex-shrink-0" />
              <span className="truncate">{item.restaurant_info.name}</span>
            </div>
          )}

          <p className="text-gray-500 text-sm m-0 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          <div className="flex items-end justify-between mt-auto pt-3 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-gray-400 line-through text-xs">
                {formatPrice(item.price)}
              </span>
              <span className="text-[#B21F1F] font-bold text-2xl">
                {formatPrice(item.price)}
              </span>
            </div>

            <div className="flex flex-col items-end gap-1 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <span>{item.quantity} unidades</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
