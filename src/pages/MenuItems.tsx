import { useState, useMemo } from "react";
import { MenuItemsGrid } from "@/features/menu/components";
import { Input, Loading } from "@/shared/components/ui";
import { useDebounced } from "@/shared/hooks";
import { MenuItem } from "@/entities";
import { useMenuItems } from "@/features/menu/hooks/useMenuItems";

function filterMenuItems(items: MenuItem[], search: string): MenuItem[] {
  const searchLower = search.toLowerCase();
  return items.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    );
  });
}

export const MenuItems = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounced(search, 300);

  const { isLoading, data: menu } = useMenuItems();

  const filtered = useMemo(() => {
    if (!menu) return null;
    return filterMenuItems(menu, debouncedSearch);
  }, [menu, debouncedSearch]);

  return (
    <div className="py-8">
      <div className="px-8 mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Explorar Alimentos Disponibles
          </h1>
          <p className="text-gray-600">
            Descubre excelente comida a precios con descuento cerca de ti
          </p>
        </div>

        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar alimentos..."
        />

        <div className="mt-8">
          {isLoading && <Loading />}
          {filtered && <MenuItemsGrid items={filtered} />}
        </div>
      </div>
    </div>
  );
};
