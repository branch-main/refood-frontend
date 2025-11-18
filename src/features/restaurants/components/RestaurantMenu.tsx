import { MenuItem } from "@/features/menu/components";
import { MenuItem as MenuItemDomain } from "@/entities";

export const RestaurantMenu = ({
  menu,
  category,
}: {
  menu: MenuItemDomain[];
  category: string;
}) => {
  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 gap-2">
        {category}
      </h2>

      {menu.length === 0 ? (
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
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
          {menu.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
