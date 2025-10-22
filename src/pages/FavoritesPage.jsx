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
    <div className="favorites-page">
      <div className="container">
        <div className="page-header">
          <h1>Mis Restaurantes Favoritos</h1>
          <p>Acceso rápido a tus lugares favoritos</p>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="restaurants-list">
            {favorites.length === 0 ? (
              <div className="empty-state">
                <p>No has agregado ningún favorito todavía.</p>
                <a href="/restaurants" className="empty-link">
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
