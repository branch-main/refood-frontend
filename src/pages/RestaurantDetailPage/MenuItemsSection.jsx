import { Card } from "../../components/common";
import { MenuItem } from "../../components/menu/MenuItem";
import { FiPackage } from "react-icons/fi";

export const MenuItemsSection = ({ menuItems }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FiPackage className="text-2xl text-[#B21F1F]" /> Alimentos Disponibles
      </h2>

      {!menuItems || menuItems.length === 0 ? (
        <Card className="shadow-lg">
          <div className="text-center py-12 px-8">
            <span className="text-5xl mb-4 block">🍴</span>
            <p className="text-gray-500 text-base">
              Este restaurante no tiene alimentos disponibles en este momento.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Vuelve pronto para ver nuevas ofertas
            </p>
          </div>
        </Card>
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
