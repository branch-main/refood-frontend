import { useState } from "react";
import { MenuItem } from "@/features/menu/components";
import { MenuItemModal } from "@/features/menu/components/MenuItemModal";
import { MenuItem as MenuItemDomain } from "@/shared/types";

export const MenuItemList = ({ items }: { items: MenuItemDomain[] }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItemDomain | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (items.length === 0) {
    return (
      <div className="col-span-full text-center py-16 px-8 text-gray-500">
        <p>No se encontraron alimentos. Intenta ajustar tus filtros.</p>
      </div>
    );
  }

  const handleOpenModal = (item: MenuItemDomain) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <MenuItem 
            key={item.id} 
            item={item} 
            onClick={() => handleOpenModal(item)}
          />
        ))}
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
