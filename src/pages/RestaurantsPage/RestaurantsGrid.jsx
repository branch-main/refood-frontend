import { RestaurantCard } from "../../components/restaurants/RestaurantCard";
import { Loading } from "../../components/common";

export const RestaurantsGrid = ({ restaurants, loading }) => {
  if (loading) {
    return <Loading />;
  }

  if (!restaurants || restaurants.length === 0) {
    return (
      <div className="col-span-full text-center py-16 px-8 text-gray-500">
        <p>No se encontraron restaurantes. Intenta ajustar tu búsqueda.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};
