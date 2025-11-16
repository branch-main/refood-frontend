import { MenuItem } from "../../components/menu/MenuItem";
import { MenuItem as MenuItemDomain } from "../../../domain/entities/MenuItem";

export const MenuItemsGrid = ({ items }: { items: MenuItemDomain[] }) => {
  if (items.length === 0) {
    return (
      <div className="col-span-full text-center py-16 px-8 text-gray-500">
        <p>No se encontraron alimentos. Intenta ajustar tus filtros.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};
