import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restaurantService, listingService } from '../services';
import { Card, Button, Loading } from '../components/common';
import { ListingCard } from '../components/listings/ListingCard';
import { formatRating } from '../utils';
import './RestaurantDetailPage.css';

export const RestaurantDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchRestaurant();
    fetchListings();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      setLoading(true);
      const data = await restaurantService.getRestaurant(id);
      setRestaurant(data);
    } catch (error) {
      console.error('Failed to fetch restaurant:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchListings = async () => {
    try {
      const data = await listingService.getListings({ restaurant: id });
      setListings(data.results || data);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
    }
  };

  const handleToggleFavorite = async () => {
    // TODO: Implement favorite toggle
    setIsFavorite(!isFavorite);
  };

  if (loading) return <Loading fullScreen />;
  if (!restaurant) return <div className="container"><p>Restaurante no encontrado</p></div>;

  return (
    <div className="restaurant-detail-page">
      <div className="restaurant-hero">
        <div className="container">
          <button className="back-button-light" onClick={() => navigate(-1)}>
            ← Volver
          </button>

          <div className="restaurant-hero-content">
            <div className="restaurant-hero-info">
              {restaurant.logo && (
                <img src={restaurant.logo} alt={restaurant.business_name} className="restaurant-logo-large" />
              )}
              
              <div className="restaurant-hero-text">
                <div className="restaurant-title-row">
                  <h1 className="restaurant-name-large">{restaurant.business_name}</h1>
                  {restaurant.is_premium && (
                    <span className="premium-badge">⭐ Premium</span>
                  )}
                </div>

                <p className="restaurant-description-large">{restaurant.description}</p>

                <div className="restaurant-meta">
                  {restaurant.rating && (
                    <div className="rating-large">
                      <span className="rating-stars">⭐ {formatRating(restaurant.rating)}</span>
                      <span className="rating-count">({restaurant.total_ratings} reseñas)</span>
                    </div>
                  )}

                  <div className="restaurant-contact-info">
                    <span>📍 {restaurant.address}</span>
                    <span>📞 {restaurant.phone}</span>
                    <span>✉️ {restaurant.email}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="restaurant-actions">
              <Button onClick={handleToggleFavorite} variant="secondary">
                {isFavorite ? '❤️ Guardado' : '🤍 Guardar'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {restaurant.opening_hours && (
          <Card className="opening-hours-card">
            <h2>🕒 Horario de Apertura</h2>
            <div className="opening-hours-grid">
              {Object.entries(restaurant.opening_hours).map(([day, hours]) => (
                <div key={day} className="opening-hours-row">
                  <span className="day-name">{getDayName(day)}</span>
                  <span className="hours-value">{hours}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        <div className="restaurant-listings-section">
          <h2>Alimentos Disponibles</h2>
          
          {listings.length === 0 ? (
            <Card>
              <div className="empty-state">
                <p>Este restaurante no tiene alimentos disponibles en este momento.</p>
              </div>
            </Card>
          ) : (
            <div className="listings-grid">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getDayName = (day) => {
  const days = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };
  return days[day] || day;
};
