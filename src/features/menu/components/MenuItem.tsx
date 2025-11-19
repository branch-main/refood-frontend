import { useState } from "react";
import {
  formatPrice,
  calculateDiscount,
  getFallbackImage,
} from "@/shared/utils";
import { MenuItem as MenuItemDomain } from "@/entities";
import { MenuItemModal } from "./MenuItemModal";

// TODO: use actual values
const DISCOUNTED_PRICE = 10;

export const MenuItem = ({ item }: { item: MenuItemDomain }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer transition-color duration-500 bg-white p-4 shadow-xs rounded-lg hover:bg-red-50"
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
              {(DISCOUNTED_PRICE && (
                <div className="flex gap-2.5 items-end leading-none">
                  <div className="font-bold text-red-500">
                    -{calculateDiscount(item.price, DISCOUNTED_PRICE)}%
                  </div>
                  <div className="font-bold text-gray-800">
                    {formatPrice(DISCOUNTED_PRICE)}
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
      </div>

      <MenuItemModal
        item={item}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
