import { useFavorites, useRestaurant } from "@/shared/hooks";
import { Link } from "react-router-dom";
import { Skeleton } from "@/shared/components/ui";
import { RestaurantCard } from "@/features/restaurants/components";

const _Restaurant = ({ id }: { id: number }) => {
  const { data: restaurant, isLoading } = useRestaurant(id);
  
  if (isLoading) {
    return <RestaurantCard.Skeleton />;
  }
  
  if (!restaurant) return null;
  return <RestaurantCard restaurant={restaurant} />;
};

const FavoritesSkeleton = () => (
  <div className="p-6">
    <Skeleton className="h-10 w-48 mb-2" />
    <Skeleton className="h-4 w-96 mb-4" />
    <div className="border-b border-gray-200 mb-5" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <RestaurantCard.Skeleton key={i} />
      ))}
    </div>
  </div>
);

export const Favorites = () => {
  const { data: favorites, isLoading, error } = useFavorites();

  // Handle error gracefully - show empty state instead of breaking
  if (error) {
    console.error("Error loading favorites:", error);
  }

  if (isLoading) {
    return <FavoritesSkeleton />;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">¡Mis favoritos!</h1>
      <p className="mt-1 text-sm text-gray-500 border-b border-gray-200 pb-4">
        Aquí encontrarás todos los restaurantes que has marcado como favoritos
        para acceder rápidamente a ellos.
      </p>

      {favorites?.length === 0 ? (
        <div className="mt-8 text-center py-12 w-1/2 mx-auto">
          <h3 className="text-lg font-semibold mb-1">
            No tienes favoritos aún
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Explora restaurantes y guarda tus favoritos con un clic en el
            corazón
          </p>
          <Link
            to="/restaurants"
            className="text-sm inline-block bg-red-500 text-white px-4 py-2.5 rounded-lg hover:bg-red-600 transition-colors font-semibold"
          >
            Explorar restaurantes
          </Link>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites?.map((restaurantId) => (
            <_Restaurant key={restaurantId} id={restaurantId} />
          ))}
        </div>
      )}
    </div>
  );
};
