import { useRestaurants } from "@/shared/hooks";
import { Restaurant } from "@/shared/types";

const RestaurantCard = ({ restaurant }: { restaurant: Restaurant }) => {
  return (
    <div className="bg-neutral-100 rounded-2xl p-4">
      <h2 className="text-lg font-semibold text-gray-800">{restaurant.name}</h2>
      <p className="text-gray-600">{restaurant.description}</p>
    </div>
  );
};

export const PartnerRestaurants = () => {
  const { data: restaurants } = useRestaurants();

  return (
    <>
      <h1 className="text-2xl font-medium text-black mb-7">Restaurantes</h1>
      <div className="bg-white h-[300px] rounded-4xl p-4 shadow-xs">
        {restaurants && restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hay restaurantes disponibles.</p>
        )}
      </div>
    </>
  );
};
