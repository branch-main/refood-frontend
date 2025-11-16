import { RestaurantCard } from "../../components/restaurants/RestaurantCard";
import { Restaurant } from "../../../domain/entities/Restaurant";

export const RestaurantList = ({
  restaurants,
}: {
  restaurants: Restaurant[];
}) => {
  if (restaurants.length === 0) {
    return (
      <div className="col-span-full text-center py-16 px-8 text-gray-500">
        <p>No se encontraron restaurantes. Intenta ajustar tu búsqueda.</p>
      </div>
    );
  }

  return (
    <>
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </>
  );
};
