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
    fetchRestaurants();
  }, [search, location]);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const params = {};
      
      if (search) params.search = search;
      if (location) {
        params.lat = location.lat;
        params.lng = location.lng;
        params.radius = 20;
      }

      const data = await restaurantService.getRestaurants(params);
      setRestaurants(data.results || data);
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="restaurants-page">
      <div className="container">
        <div className="page-header">
          <h1>Partner Restaurants</h1>
          <p>Discover restaurants fighting food waste in your area</p>
        </div>

        <Input
          type="text"
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <Loading />
        ) : (
          <div className="restaurants-list">
            {restaurants.length === 0 ? (
              <div className="empty-state">
                <p>No restaurants found. Try adjusting your search.</p>
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
