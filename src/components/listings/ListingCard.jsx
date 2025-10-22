import { useNavigate } from 'react-router-dom';
import { Card } from '../common';
import { formatPrice, formatDistance, calculateDiscount } from '../../utils';
import './ListingCard.css';

export const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const discount = calculateDiscount(listing.original_price, listing.discounted_price);

  return (
    <Card hover onClick={() => navigate(`/listings/${listing.id}`)}>
      <div className="listing-card">
        {listing.image && (
          <div className="listing-image">
            <img src={listing.image} alt={listing.title} />
            {discount > 0 && (
              <div className="listing-badge">{discount}% OFF</div>
            )}
          </div>
        )}
        
        <div className="listing-content">
          <h3 className="listing-title">{listing.title}</h3>
          
          {listing.restaurant_info && (
            <p className="listing-restaurant">
              🏪 {listing.restaurant_info.business_name}
            </p>
          )}

          <p className="listing-description">{listing.description}</p>

          <div className="listing-footer">
            <div className="listing-price">
              <span className="price-original">{formatPrice(listing.original_price)}</span>
              <span className="price-discounted">{formatPrice(listing.discounted_price)}</span>
            </div>

            {listing.distance && (
              <span className="listing-distance">
                📍 {formatDistance(listing.distance)}
              </span>
            )}
          </div>

          <div className="listing-meta">
            <span className={`listing-status status-${listing.status}`}>
              {listing.status}
            </span>
            <span className="listing-quantity">
              {listing.available_quantity} available
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
