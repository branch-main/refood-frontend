import { RestaurantCard } from "@/features/restaurants/components";
import { useRestaurants } from "@/shared/hooks";

export const PartnerRestaurants = () => {
  const { data: restaurants } = useRestaurants();

  return (
    <>
      <h1 className="text-2xl font-medium text-black mb-7">Restaurantes</h1>
      <div className="bg-white rounded-4xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.02)] card">
        {restaurants && restaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
