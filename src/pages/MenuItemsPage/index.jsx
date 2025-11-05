import { useState, useEffect } from "react";
import { menuService } from "../../services";
import { FeaturedCarousel } from "./FeaturedCarousel";
import { FilterBar } from "./FilterBar";
import { MenuItemsGrid } from "./MenuItemsGrid";
import { useAsync, useDebounce } from "../../hooks";

export const MenuItemsPage = () => {
  const [featured, setFeatured] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
  });

  const debouncedSearch = useDebounce(filters.search, 100);

  const { loading, value: items } = useAsync(async () => {
    return menuService
      .getMenuItems(debouncedSearch)
      .then((items) => items.results);
  }, [debouncedSearch]);

  useEffect(() => {
    if (!items) return;
    setFeatured(items.slice(0, 5));
  }, [items]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturedCarousel menuItems={featured} />

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Explorar Alimentos Disponibles
          </h1>
          <p className="text-gray-600">
            Descubre excelente comida a precios con descuento cerca de ti
          </p>
        </div>

        <FilterBar filters={filters} onChange={handleFilterChange} />
        <MenuItemsGrid items={items || []} loading={!items && loading} />
      </div>
    </div>
  );
};
