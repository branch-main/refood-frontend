import { useState, useEffect } from 'react';
import { listingService, categoryService } from '../services';
import { useGeolocation } from '../hooks';
import { formatPrice, formatDistance, calculateDiscount } from '../utils';

/**
 * Example component demonstrating API usage for food listings
 */
function ListingsExample() {
  const [listings, setListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { location, loading: locationLoading } = useGeolocation();

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data.results || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch listings when filters or location change
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = {};
        
        // Add location if available
        if (location) {
          params.lat = location.lat;
          params.lng = location.lng;
          params.radius = 10;
        }
        
        // Add category filter
        if (selectedCategory) {
          params.category = selectedCategory;
        }
        
        // Add search term
        if (searchTerm) {
          params.search = searchTerm;
        }

        const data = await listingService.getListings(params);
        setListings(data.results || []);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch listings:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!locationLoading) {
      fetchListings();
    }
  }, [location, locationLoading, selectedCategory, searchTerm]);

  if (loading) {
    return <div>Loading listings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="listings-container">
      <h1>Available Food Listings</h1>

      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search listings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Listings Grid */}
      <div className="listings-grid">
        {listings.length === 0 ? (
          <p>No listings found</p>
        ) : (
          listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        )}
      </div>
    </div>
  );
}

/**
 * Individual listing card component
 */
function ListingCard({ listing }) {
  const discount = calculateDiscount(
    listing.original_price,
    listing.discounted_price
  );

  return (
    <div className="listing-card">
      {listing.image && (
        <img src={listing.image} alt={listing.title} />
      )}
      
      <div className="listing-info">
        <h3>{listing.title}</h3>
        <p>{listing.description}</p>
        
        {listing.restaurant_info && (
          <p className="restaurant-name">
            {listing.restaurant_info.business_name}
          </p>
        )}

        <div className="pricing">
          <span className="original-price">
            {formatPrice(listing.original_price)}
          </span>
          <span className="discounted-price">
            {formatPrice(listing.discounted_price)}
          </span>
          <span className="discount-badge">{discount}% OFF</span>
        </div>

        {listing.distance && (
          <p className="distance">
            📍 {formatDistance(listing.distance)}
          </p>
        )}

        <div className="availability">
          <p>Available: {listing.available_quantity} / {listing.quantity}</p>
          <p className="status">{listing.status}</p>
        </div>

        {listing.allergens && listing.allergens.length > 0 && (
          <div className="allergens">
            <strong>Allergens:</strong> {listing.allergens.join(', ')}
          </div>
        )}

        <button className="order-btn">Order Now</button>
      </div>
    </div>
  );
}

export default ListingsExample;
