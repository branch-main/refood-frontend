# ReeFood API Services

This directory contains all API service modules for connecting the React frontend to the Django backend.

## Structure

```
services/
├── api.js                    # Base axios configuration with interceptors
├── auth.service.js           # Authentication & user management
├── restaurant.service.js     # Restaurant operations
├── listing.service.js        # Food listing operations
├── order.service.js          # Order management
├── review.service.js         # Review & rating system
├── notification.service.js   # Notifications
├── favorite.service.js       # Favorite restaurants
├── category.service.js       # Food categories
├── ngo.service.js           # NGO/Food Bank operations
└── index.js                 # Central exports
```

## Configuration

Set the API base URL in your `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## Usage

### Import Services

```javascript
import { 
  authService, 
  restaurantService, 
  listingService,
  orderService,
  reviewService,
  notificationService,
  favoriteService,
  categoryService,
  ngoService
} from './services';
```

### Authentication

```javascript
// Register a new user
const userData = {
  username: "john_doe",
  email: "john@example.com",
  password: "securePassword123",
  user_type: "consumer", // consumer, restaurant, or ngo
  first_name: "John",
  last_name: "Doe",
  phone: "+1234567890"
};
const { user, token } = await authService.register(userData);

// Login
const { user, token } = await authService.login("john_doe", "securePassword123");

// Get current user
const currentUser = await authService.getCurrentUser();

// Logout
await authService.logout();

// Check authentication status
const isAuth = authService.isAuthenticated();
```

### Restaurants

```javascript
// Get all restaurants
const restaurants = await restaurantService.getRestaurants();

// Get restaurants with filters
const filteredRestaurants = await restaurantService.getRestaurants({
  lat: 40.712776,
  lng: -74.005974,
  radius: 5,
  is_premium: true,
  search: "pizza"
});

// Get single restaurant
const restaurant = await restaurantService.getRestaurant(1);

// Create restaurant profile (requires restaurant user type)
const restaurantData = {
  business_name: "Pizza Palace",
  description: "Best pizza in town",
  address: "123 Main St, City",
  latitude: "40.712776",
  longitude: "-74.005974",
  phone: "+1234567890",
  email: "contact@pizzapalace.com",
  opening_hours: {
    monday: "09:00-22:00",
    tuesday: "09:00-22:00"
  }
};
const newRestaurant = await restaurantService.createRestaurant(restaurantData);

// Get restaurant statistics
const stats = await restaurantService.getRestaurantStats(1);

// Get restaurant listings
const listings = await restaurantService.getRestaurantListings(1);

// Search nearby restaurants
const nearby = await restaurantService.searchNearby(40.712776, -74.005974, 10);
```

### Food Listings

```javascript
// Get all listings
const listings = await listingService.getListings();

// Get listings with filters
const filtered = await listingService.getListings({
  lat: 40.712776,
  lng: -74.005974,
  radius: 5,
  category: 2,
  listing_type: "sale",
  min_price: 5,
  max_price: 15,
  restaurant: 1,
  search: "pizza"
});

// Get nearby listings
const nearbyListings = await listingService.getNearbyListings(40.712776, -74.005974, 5);

// Get single listing
const listing = await listingService.getListing(1);

// Create listing (restaurant owners only)
const listingData = {
  category: 2,
  title: "Margherita Pizza - End of Day",
  description: "Fresh pizza from today's batch",
  image: fileObject, // File object from input
  original_price: "15.00",
  discounted_price: "7.50",
  quantity: 5,
  listing_type: "sale",
  available_from: "2024-01-15T18:00:00Z",
  available_until: "2024-01-15T23:00:00Z",
  pickup_instructions: "Pick up at counter",
  allergens: ["gluten", "dairy"]
};
const newListing = await listingService.createListing(listingData);

// Update listing
const updated = await listingService.updateListing(1, { quantity: 3 });

// Delete listing
await listingService.deleteListing(1);
```

### Orders

```javascript
// Get all orders
const orders = await orderService.getOrders();

// Get single order
const order = await orderService.getOrder(1);

// Create order
const orderData = {
  restaurant_id: 1,
  items: [
    { listing_id: 1, quantity: 3 },
    { listing_id: 5, quantity: 1 }
  ],
  pickup_time: "2024-01-15T19:00:00Z",
  notes: "Please add extra napkins"
};
const newOrder = await orderService.createOrder(orderData);

// Cancel order
await orderService.cancelOrder(1);

// Confirm order (restaurant)
await orderService.confirmOrder(1);

// Mark ready (restaurant)
await orderService.markOrderReady(1);

// Complete order
await orderService.completeOrder(1);

// Get order history with status filter
const completed = await orderService.getOrderHistory("completed");
```

### Reviews

```javascript
// Get all reviews
const reviews = await reviewService.getReviews();

// Get restaurant reviews
const restaurantReviews = await reviewService.getRestaurantReviews(1);

// Get single review
const review = await reviewService.getReview(1);

// Create review
const reviewData = {
  order: 1,
  rating: 5,
  comment: "Great food, good price!",
  food_quality: 5,
  service_rating: 4
};
const newReview = await reviewService.createReview(reviewData);

// Update review
const updated = await reviewService.updateReview(1, { rating: 4 });

// Delete review
await reviewService.deleteReview(1);
```

### Notifications

```javascript
// Get all notifications
const notifications = await notificationService.getNotifications();

// Mark notification as read
await notificationService.markAsRead(1);

// Mark all as read
await notificationService.markAllAsRead();

// Get unread count
const unreadCount = await notificationService.getUnreadCount();
```

### Favorites

```javascript
// Get all favorites
const favorites = await favoriteService.getFavorites();

// Add to favorites
const favorite = await favoriteService.addFavorite(1);

// Remove from favorites
await favoriteService.removeFavorite(1);

// Check if restaurant is favorited
const isFav = await favoriteService.isFavorite(1);

// Toggle favorite
await favoriteService.toggleFavorite(1, favoriteId);
```

### Categories

```javascript
// Get all categories
const categories = await categoryService.getCategories();

// Get single category
const category = await categoryService.getCategory(1);
```

### NGOs

```javascript
// Get all NGOs
const ngos = await ngoService.getNGOs();

// Get single NGO
const ngo = await ngoService.getNGO(1);

// Create NGO profile
const ngoData = {
  organization_name: "Food Bank City",
  description: "Helping fight hunger",
  address: "456 Charity Ave",
  latitude: "40.712776",
  longitude: "-74.005974",
  phone: "+1234567890",
  email: "contact@foodbank.org",
  registration_number: "NGO12345"
};
const newNGO = await ngoService.createNGO(ngoData);

// Update NGO
const updated = await ngoService.updateNGO(1, { description: "New description" });

// Delete NGO
await ngoService.deleteNGO(1);
```

## Error Handling

All services automatically handle errors through axios interceptors:

- **401 Unauthorized**: Automatically redirects to login
- **Other errors**: Rejected promise with error details

Example error handling:

```javascript
try {
  const data = await listingService.getListings();
} catch (error) {
  if (error.response) {
    // Server responded with error
    console.error('Error:', error.response.data);
  } else if (error.request) {
    // No response received
    console.error('Network error');
  } else {
    // Other errors
    console.error('Error:', error.message);
  }
}
```

## Authentication

The API automatically includes the authentication token in all requests. The token is stored in localStorage after successful login or registration.

Token format: `Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`

## React Component Examples

### Using in Functional Components

```javascript
import { useState, useEffect } from 'react';
import { listingService } from './services';

function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await listingService.getListings();
        setListings(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {listings.map(listing => (
        <div key={listing.id}>
          <h3>{listing.title}</h3>
          <p>{listing.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Using with React Router Protected Routes

```javascript
import { Navigate } from 'react-router-dom';
import { authService } from './services';

function ProtectedRoute({ children }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
}
```

## Best Practices

1. **Always handle errors**: Wrap service calls in try-catch blocks
2. **Use loading states**: Show loading indicators during API calls
3. **Token management**: The services handle tokens automatically
4. **Logout on 401**: Automatically redirects to login on authentication failure
5. **Environment variables**: Use `.env` for API configuration
6. **File uploads**: Use FormData for image uploads (handled automatically)

## API Documentation

For complete API documentation, see:
- `../django-proyecto/API_DOCUMENTATION.md`
- Backend README: `../django-proyecto/README.md`

## Support

For issues or questions about the API services, contact the development team.
