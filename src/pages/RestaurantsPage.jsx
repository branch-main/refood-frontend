import { useState, useEffect } from 'react';
import { restaurantService } from '../services';
import { useGeolocation } from '../hooks';
import { RestaurantCard } from '../components/restaurants/RestaurantCard';
import { Loading, Input } from '../components/common';
import './RestaurantsPage.css';

export const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const { location } = useGeolocation();

  useEffect(() => {
    // Fetch immediately on mount
    fetchRestaurants();
  }, []);

  useEffect(() => {
    // Fetch when search changes
    fetchRestaurants();
  }, [search]);

  useEffect(() => {
    // Refetch when location becomes available
    if (location) {
      fetchRestaurants();
    }
  }, [location]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (search) params.search = search;
      
      // Add location params if available
      if (location) {
        params.lat = location.lat;
        params.lng = location.lng;
        params.radius = 20;
      }

      const data = await restaurantService.getRestaurants(params);
      setRestaurants(data.results || data);
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restaurants-page">
      <div className="container">
        <div className="page-header">
          <h1>Restaurantes Asociados</h1>
          <p>Descubre restaurantes combatiendo el desperdicio de alimentos en tu área</p>
        </div>

        <Input
          type="text"
          placeholder="Buscar restaurantes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <Loading />
        ) : (
          <div className="restaurants-list">
            {restaurants.length === 0 ? (
              <div className="empty-state">
                <p>No se encontraron restaurantes. Intenta ajustar tu búsqueda.</p>
              </div>
            ) : (
              restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
