import { useState } from "react";
import {
  formatPrice,
  calculateDiscount,
  getFallbackImage,
} from "@/shared/utils";
import { MenuItemModal } from "./MenuItemModal";
import { Skeleton } from "@/shared/components/ui";
import { MenuItem as MenuItemType } from "@/shared/types";

// TODO: use actual values
const DISCOUNTED_PRICE = 10;

export const MenuItem = ({ item }: { item: MenuItemType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldMount, setShouldMount] = useState(false);

  const handleOpen = () => {
    setShouldMount(true);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setShouldMount(false), 300);
  };

  return (
    <>
      <div
        onClick={handleOpen}
        className="cursor-pointer transition-transform duration-500 hover:scale-105 border-b border-gray-200 pb-5"
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

      {shouldMount && (
        <MenuItemModal item={item} isOpen={isModalOpen} onClose={handleClose} />
      )}
    </>
  );
};

MenuItem.Skeleton = () => {
  return (
    <div className="border-b border-gray-200 pb-5">
      <div className="flex justify-between gap-4 w-full">
        <div className="flex flex-col justify-between flex-1 gap-4">
          <div className="flex flex-col gap-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          <div className="flex gap-2.5 items-end leading-none space-x-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-5 w-14" />
          </div>
        </div>

        <Skeleton className="w-25 h-25 rounded-xl" />
      </div>
    </div>
  );
};
