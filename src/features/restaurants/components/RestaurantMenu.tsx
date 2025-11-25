import { useState } from "react";
import { MenuItem } from "@/features/menu/components";
import { MenuItemModal } from "@/features/menu/components/MenuItemModal";
import { Skeleton } from "@/shared/components/ui";
import { useMenuByRestaurant } from "@/shared/hooks";
import { MenuItem as MenuItemType, Category } from "@/shared/types";

export const RestaurantMenu = ({
  restaurantId,
  category,
}: {
  restaurantId: number;
  category: Category;
}) => {
  const { isLoading, data: menu } = useMenuByRestaurant(restaurantId);
  const [selectedItem, setSelectedItem] = useState<MenuItemType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <RestaurantMenu.Skeleton />;
  }

  const handleOpenModal = (item: MenuItemType) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  // Filter items: only show available items that belong to this category
  const filteredItems = menu?.filter(
    (item) => item.categoryId === category.id && item.isAvailable
  ) || [];

  // Don't render section if no items
  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-8">{category.name}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <MenuItem 
              key={item.id} 
              item={item} 
              onClick={() => handleOpenModal(item)}
            />
          ))}
        </div>
      </div>

      {selectedItem && (
        <MenuItemModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

RestaurantMenu.Skeleton = () => (
  <div>
    <Skeleton className="w-48 h-8 mb-4 rounded-md" />
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <MenuItem.Skeleton key={i} />
      ))}
    </div>
  </div>
);
