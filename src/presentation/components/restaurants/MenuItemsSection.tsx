import { MenuItem } from "../../components/menu/MenuItem";
import { FiPackage } from "react-icons/fi";
import { MenuItem as MenuItemDomain } from "../../../domain/entities/MenuItem";

interface MenuItemsSectionProps {
  menuItems: MenuItemDomain[] | null;
}

export const MenuItemsSection = ({ menuItems }: MenuItemsSectionProps) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
        <FiPackage className="text-xl text-[#B21F1F]" />
        Alimentos Disponibles
      </h2>

      {!menuItems || menuItems.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="text-center py-16 px-8">
            <div className="text-5xl mb-4">🍴</div>
            <p className="text-gray-600 text-base font-medium mb-2">
              No hay alimentos disponibles
            </p>
            <p className="text-gray-500 text-sm">
              Este restaurante no tiene alimentos disponibles en este momento
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
