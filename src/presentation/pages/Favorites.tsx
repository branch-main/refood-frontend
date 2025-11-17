import { useState, useEffect } from "react";
import { GetFavoritesUseCase, RemoveFavoriteUseCase } from "../../application/favorites";
import { container } from "../../container";
import { FavoriteRepository } from "../../domain/repositories/FavoriteRepository";
import { Favorite } from "../../domain/entities/Favorite";
import { RestaurantCard } from "../components/restaurants/RestaurantCard";
import { Loading } from "../components/common";

const getFavorites = new GetFavoritesUseCase(
  container.resolve<FavoriteRepository>("FavoriteRepository"),
);
const removeFavorite = new RemoveFavoriteUseCase(
  container.resolve<FavoriteRepository>("FavoriteRepository"),
);

export const Favorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await getFavorites.execute();
      setFavorites(data);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (favoriteId: number) => {
    try {
      await removeFavorite.execute(favoriteId);
      setFavorites(favorites.filter((fav) => fav.id !== favoriteId));
    } catch (error) {
      console.error("Failed to remove favorite:", error);
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Mis Restaurantes Favoritos</h1>
          <p className="text-gray-600">Acceso rápido a tus lugares favoritos</p>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {favorites.length === 0 ? (
              <div className="col-span-full text-center py-16 px-8 text-gray-500">
                <p>No has agregado ningún favorito todavía.</p>
                <a
                  href="/restaurants"
                  className="inline-block mt-4 text-[#B21F1F] font-semibold hover:underline"
                >
                  Explorar restaurantes
                </a>
              </div>
            ) : (
              favorites.map((favorite) => (
                <div key={favorite.id}>
                  {/* Display favorite restaurant */}
                  <div className="bg-white rounded-2xl shadow-md p-4">
                    <h3 className="text-lg font-bold mb-2">{favorite.restaurantName}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {favorite.restaurantDescription}
                    </p>
                    <button
                      onClick={() => handleRemoveFavorite(favorite.id)}
                      className="w-full bg-red-50 text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                    >
                      Remover de Favoritos
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
