import { useNavigate } from 'react-router-dom';
import { Card } from '../common';
import { formatDistance, formatRating } from '../../utils';
import './RestaurantCard.css';

export const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();

  return (
    <Card hover onClick={() => navigate(`/restaurants/${restaurant.id}`)}>
      <div className="restaurant-card">
        {restaurant.logo && (
          <div className="restaurant-logo">
            <img src={restaurant.logo} alt={restaurant.business_name} />
          </div>
        )}
        
        <div className="restaurant-content">
          <div className="restaurant-header">
            <h3 className="restaurant-name">{restaurant.business_name}</h3>
            {restaurant.is_premium && (
              <span className="restaurant-premium">⭐ Premium</span>
            )}
          </div>

          <p className="restaurant-description">{restaurant.description}</p>

          <div className="restaurant-info">
            <span className="restaurant-address">
              📍 {restaurant.address}
            </span>
            {restaurant.distance && (
              <span className="restaurant-distance">
                {formatDistance(restaurant.distance)} away
              </span>
            )}
          </div>

          {restaurant.rating && (
            <div className="restaurant-rating">
              <span className="rating-stars">⭐ {formatRating(restaurant.rating)}</span>
              <span className="rating-count">({restaurant.total_ratings} reviews)</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
