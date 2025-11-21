import { useState, useMemo } from "react";
import { MenuItemList } from "@/features/menu/components";
import { Input } from "@/shared/components/ui";
import { useDebounced } from "@/shared/hooks";
import { MenuItem } from "@/shared/types";
import { useMenu } from "@/shared/hooks";
import { MenuItem as MenuItemComponent } from "@/features/menu/components";

function filterMenuItems(items: MenuItem[], search: string): MenuItem[] {
  const searchLower = search.toLowerCase();
  return items.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower)
    );
  });
}

export const Menu = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounced(search, 300);

  let { isLoading, data: menu } = useMenu();

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
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 12 }).map(() => (
                <MenuItemComponent.Skeleton />
              ))}
            </div>
          )}
          {filtered && <MenuItemList items={filtered} />}
        </div>
      </div>
    </div>
  );
};
