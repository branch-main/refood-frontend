import { useState, useEffect } from 'react';
import { restaurantService } from '../services';
import { useGeolocation } from '../hooks';
import { RestaurantCard } from '../components/restaurants/RestaurantCard';
import { Loading, Input } from '../components/common';

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
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Restaurantes Asociados</h1>
          <p className="text-gray-600">Descubre restaurantes combatiendo el desperdicio de alimentos en tu área</p>
        </div>

        <div className="mb-8">
          <Input
            type="text"
            placeholder="Buscar restaurantes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-6 mt-8">
            {restaurants.length === 0 ? (
              <div className="text-center py-16 px-8 text-gray-500">
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
