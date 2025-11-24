import { useFavorites, useRestaurant } from "@/shared/hooks";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { Loading } from "@/shared/components/ui";
import { RestaurantCard } from "@/features/restaurants/components";

const _Restaurant = ({ id }: { id: number }) => {
  const { data: restaurant } = useRestaurant(id);
  if (!restaurant) return null;
  return <RestaurantCard restaurant={restaurant} />;
};

export const Favorites = () => {
  const { data: favorites, isLoading, error } = useFavorites();

  // Handle error gracefully - show empty state instead of breaking
  if (error) {
    console.error("Error loading favorites:", error);
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">¡Mis favoritos!</h1>
      <p className="mt-1 text-sm text-gray-500 border-b border-gray-200 pb-4">
        Aquí encontrarás todos los restaurantes que has marcado como favoritos
        para acceder rápidamente a ellos.
      </p>

      {favorites?.length === 0 ? (
        <div className="mt-8 text-center py-12">
          <FiHeart className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No tienes favoritos aún
          </h3>
          <p className="text-gray-500 mb-6">
            Explora restaurantes y guarda tus favoritos con un clic en el
            corazón
          </p>
          <Link
            to="/restaurants"
            className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
          >
            Explorar restaurantes
          </Link>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites?.map((restaurantId) => (
            <_Restaurant id={restaurantId} />
          ))}
        </div>
      )}
    </div>
  );
};
