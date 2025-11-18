import { Link } from "react-router-dom";
import {
  formatPrice,
  calculateDiscount,
  getFallbackImage,
} from "@/shared/utils";
import { MenuItem as MenuItemDomain } from "@/entities";

export const MenuItem = ({ item }: { item: MenuItemDomain }) => {
  const discountedPrice = 10;
  const discount = calculateDiscount(item.price, discountedPrice);

  return (
    <Link
      to={`/menu/${item.id}`}
      className="transition-color duration-500 bg-white p-4 shadow-xs rounded-lg hover:bg-red-50"
    >
      <div className="flex flex-col">
        <div className="flex justify-between gap-4 w-full">
          <div className="flex flex-col justify-between flex-1 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-gray-800 line-clamp-1">{item.name}</span>
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.description}
              </p>
            </div>
            {(discount >= 1 && (
              <div className="flex gap-2.5 items-end leading-none">
                <div className="font-bold text-red-500">-{discount}%</div>
                <div className="font-bold text-gray-800">
                  {formatPrice(discountedPrice)}
                </div>
                <div className="text-gray-500 text-sm line-through leading-none">
                  {formatPrice(item.price)}
                </div>
              </div>
            )) || (
              <div className="font-bold text-gray-800">
                {formatPrice(item.price)}
              </div>
            )}
          </div>

          <div className="w-25 h-25 rounded-xl shadow-lg">
            <img
              src={getFallbackImage(item.name, item.image)}
              alt={item.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};
