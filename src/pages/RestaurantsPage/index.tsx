import { useState } from "react";
import { restaurantService } from "../../services";
import { useAsync, useDebounce } from "../../hooks";
import { RestaurantFilterBar } from "./RestaurantFilterBar";
import { RestaurantsGrid } from "./RestaurantsGrid";

export const RestaurantsPage = () => {
  const [filters, setFilters] = useState({
    search: "",
  });

  const debouncedSearch = useDebounce(filters.search, 500);

  const { loading, value: restaurants } = useAsync(async () => {
    const data = await restaurantService.getRestaurants();
    const allRestaurants = data.results || data;

    if (!debouncedSearch) {
      return allRestaurants;
    }

    const searchLower = debouncedSearch.toLowerCase();
    return allRestaurants.filter((restaurant) => {
      return (
        restaurant.name?.toLowerCase().includes(searchLower) ||
        restaurant.address?.toLowerCase().includes(searchLower) ||
        restaurant.description?.toLowerCase().includes(searchLower)
      );
    });
  }, [debouncedSearch]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Restaurantes Asociados</h1>
          <p className="text-gray-600">
            Descubre restaurantes combatiendo el desperdicio de alimentos en tu
            área
          </p>
        </div>

        <RestaurantFilterBar filters={filters} onChange={handleFilterChange} />

        <RestaurantsGrid restaurants={restaurants} loading={loading} />
      </div>
    </div>
  );
};
