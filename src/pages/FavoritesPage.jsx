import { useState, useEffect } from 'react';
import { favoriteService } from '../services';
import { RestaurantCard } from '../components/restaurants/RestaurantCard';
import { Loading } from '../components/common';

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await favoriteService.getFavorites();
      setFavorites(data.results || data);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    } finally {
      setLoading(false);
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
          <div className="flex flex-col gap-6 mt-8">
            {favorites.length === 0 ? (
              <div className="text-center py-16 px-8 text-gray-500">
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
                <RestaurantCard 
                  key={favorite.id} 
                  restaurant={favorite.restaurant_info}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
