import { useMemo, useState } from "react";
import { useAsync } from "../hooks";
import { RestaurantList } from "../components/restaurants/RestaurantList";
import { SearchBar } from "../components/common/SearchBar";
import { GetRestaurantsUseCase } from "../../application/restaurants/getRestaurants";
import { Select } from "../components/common/Select";
import { Restaurant } from "../../domain/entities/Restaurant";
import { useDebounced } from "../hooks";
import { RestaurantPreview } from "../components/restaurants/RestaurantPreview";
import { container } from "../../container";
import { IoMdHome } from "react-icons/io";

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevancia" },
  { value: "featured", label: "Promociones" },
  { value: "rating", label: "Calificación" },
  { value: "delivery_time", label: "Tiempo de Entrega" },
  { value: "delivery_cost", label: "Costo de Envío" },
];

const getRestaurants = new GetRestaurantsUseCase(
  container.resolve("RestaurantRepository"),
);

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

export const Restaurants = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const debouncedSearch = useDebounced(search, 300);

  const { value: restaurants } = useAsync(
    async () => getRestaurants.execute(),
    [],
  );

  const filtered = useMemo(() => {
    if (!restaurants) return null;
    return filterRestaurants(restaurants, debouncedSearch);
  }, [restaurants, debouncedSearch]);

  const trending = restaurants ? [...restaurants, ...restaurants] : [];

  return (
    <div className="pb-8 bg-neutral-50">
      <div className="flex flex-col bg-red-50 w-full mb-8 px-4 pt-2 pb-4 gap-1">
        <span className="text-red-500 font-bold text-lg">
          Restaurantes cerca de mí
        </span>
        <div className="flex items-center gap-2 text-xs text-gray-800">
          <IoMdHome className="w-4 h-4" />
          <span>ReFood</span>
          <span>•</span>
          <span>Restaurantes cerca de mí</span>
        </div>
      </div>

      <div className="mx-auto px-6 md:px-4 flex flex-col gap-4">
        <div className="flex flex-col justify-between md:flex-row items-end md:items-center px-4 md:px-8 gap-8 md:gap-16">
          <div className="w-full md:max-w-1/2">
            <SearchBar
              placeholder="Buscar restaurantes..."
              value={search}
              onChange={setSearch}
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-800 text-sm font-bold whitespace-nowrap">
              Ordenar por:
            </span>
            <Select
              options={SORT_OPTIONS}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>
        </div>

        {trending.length > 0 && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mt-4">
              ¡Los {trending?.length} más elegidos!
            </h1>
            <div className="flex gap-8 overflow-x-auto py-4">
              {trending.map((restaurant) => (
                <RestaurantPreview restaurant={restaurant} />
              ))}
            </div>
          </>
        )}

        <h1 className="text-2xl font-bold text-gray-800">
          Restaurantes encontrados {filtered ? `(${filtered.length})` : ""}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {filtered && <RestaurantList restaurants={filtered} />}
        </div>
      </div>
    </div>
  );
};
