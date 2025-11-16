import { useMemo, useState } from "react";
import { useAsync } from "../hooks";
import { RestaurantList } from "../components/restaurants/RestaurantList";
import { ApiRestaurantRepository } from "../../infrastructure/repositories/ApiRestaurantRepository";
import { apiClient } from "../../infrastructure/api/axios.config";
import { GetRestaurantsUseCase } from "../../application/restaurants/getRestaurants";
import { Input, Loading } from "../components/common";
import { Restaurant } from "../../domain/entities/Restaurant";
import { useDebounced } from "../hooks";

const restaurantRepository = new ApiRestaurantRepository(apiClient);
const getRestaurants = new GetRestaurantsUseCase(restaurantRepository);

function filterRestaurants(restaurants: Restaurant[], search: string) {
  const searchLower = search.toLowerCase();
  return restaurants.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(searchLower) ||
      restaurant.address.toLowerCase().includes(searchLower) ||
      restaurant.description.toLowerCase().includes(searchLower)
    );
  });
}

export const RestaurantsPage = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounced(search, 300);

  const { loading, value: restaurants } = useAsync(
    async () => getRestaurants.execute(),
    [],
  );

  const filtered = useMemo(() => {
    if (!restaurants) return null;
    return filterRestaurants(restaurants, debouncedSearch);
  }, [restaurants, debouncedSearch]);

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

        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar restaurantes..."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {loading && <Loading />}
          {filtered && <RestaurantList restaurants={filtered} />}
        </div>
      </div>
    </div>
  );
};
