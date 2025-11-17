import { useState, useMemo } from "react";
import { FeaturedCarousel } from "../components/menu/FeaturedCarousel";
import { MenuItemsGrid } from "../components/menu/MenuItemsGrid";
import { Input, Loading } from "../components/common";
import { useAsync, useDebounced } from "../hooks";
import { GetMenuItemsUseCase } from "../../application/menu/getMenuItems";
import { container } from "../../container";
import { MenuItemRepository } from "../../domain/repositories/MenuItemRepository";
import { MenuItem } from "../../domain/entities/MenuItem";

const getMenuItems = new GetMenuItemsUseCase(
  container.resolve<MenuItemRepository>("MenuItemRepository"),
);

function filterMenuItems(items: MenuItem[], search: string): MenuItem[] {
  const searchLower = search.toLowerCase();
  return items.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.category_name?.toLowerCase().includes(searchLower) ||
      item.restaurant_name?.toLowerCase().includes(searchLower)
    );
  });
}

export const MenuItems = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounced(search, 300);

  const { loading, value: items } = useAsync(
    async () => getMenuItems.execute(null),
    [],
  );

  const filtered = useMemo(() => {
    if (!items) return null;
    return filterMenuItems(items, debouncedSearch);
  }, [items, debouncedSearch]);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {loading && <Loading />}
          {filtered && <MenuItemsGrid items={filtered} />}
        </div>
      </div>
    </div>
  );
};
