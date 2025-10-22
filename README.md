# ReeFood React Frontend

React web client for the ReeFood platform - reducing food waste by connecting restaurants with consumers and NGOs.

## 🎯 Overview

This is the **React Web Client** component of the ReeFood system, providing a web interface for browsing and ordering discounted surplus food from restaurants.

### System Architecture

ReeFood consists of four interconnected components:
1. **Android Client** (Kotlin) - Mobile app
2. **Django Backend** (Django REST Framework) - Core API and business logic
3. **Spring Boot Admin Panel** - Restaurant management
4. **React Web Client** (This project) - Web interface

## ✨ Features

- ✅ **Complete API Integration** - Full implementation of Django backend API
- ✅ **User Authentication** - Login, register, logout with token management
- ✅ **Restaurant Browsing** - View and search restaurants with geolocation
- ✅ **Food Listings** - Browse available surplus food with filters
- ✅ **Order Management** - Place and track orders
- ✅ **Reviews & Ratings** - Rate restaurants and food quality
- ✅ **Notifications** - Real-time notifications for orders and listings
- ✅ **Favorites** - Save favorite restaurants
- ✅ **Geolocation** - Find nearby restaurants and listings
- ✅ **Responsive Design** - Mobile-friendly interface

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Django backend running (see `../django-proyecto/README.md`)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set your backend URL:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 📁 Project Structure

```
src/
├── services/              # API service modules
│   ├── api.js            # Axios configuration
│   ├── auth.service.js   # Authentication
│   ├── restaurant.service.js
│   ├── listing.service.js
│   ├── order.service.js
│   ├── review.service.js
│   ├── notification.service.js
│   ├── favorite.service.js
│   ├── category.service.js
│   ├── ngo.service.js
│   └── README.md         # Service documentation
├── hooks/                # Custom React hooks
│   ├── useAuth.js        # Authentication hook
│   ├── useApi.js         # Generic API hook
│   └── useGeolocation.js # Geolocation hook
├── utils/                # Utility functions
│   ├── constants.js      # Application constants
│   ├── formatters.js     # Data formatters
│   ├── validators.js     # Validation functions
│   └── helpers.js        # Helper functions
├── examples/             # Example components
│   ├── AuthExample.jsx
│   └── ListingsExample.jsx
├── components/           # React components (to be added)
├── pages/               # Page components (to be added)
└── App.jsx              # Main app component
```

## 📚 API Implementation

The API implementation is complete and documented. See:
- **[API_IMPLEMENTATION.md](./API_IMPLEMENTATION.md)** - Complete API documentation
- **[src/services/README.md](./src/services/README.md)** - Service usage guide
- **[src/examples/](./src/examples/)** - Example components

### Quick API Usage

```javascript
// Import services
import { authService, listingService, orderService } from './services';

// Authentication
const { user, token } = await authService.login('username', 'password');

// Get listings with filters
const listings = await listingService.getListings({
  lat: 40.712776,
  lng: -74.005974,
  radius: 5,
  category: 2,
  listing_type: 'sale'
});

// Place an order
const order = await orderService.createOrder({
  restaurant_id: 1,
  items: [
    { listing_id: 1, quantity: 2 }
  ],
  pickup_time: '2024-01-15T19:00:00Z'
});
```

### Using Custom Hooks

```javascript
import { useAuth, useApi, useGeolocation } from './hooks';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const { location } = useGeolocation();
  const { data, loading, error } = useApi(() => listingService.getListings());
  
  // Component logic
}
```

## 🛠️ Available Services

All backend API endpoints are implemented:

- **Authentication** - Register, login, logout, user profile
- **Restaurants** - CRUD operations, search, statistics
- **Food Listings** - Browse, create, update, delete listings
- **Orders** - Create, track, cancel, confirm orders
- **Reviews** - Rate and review restaurants
- **Notifications** - Manage user notifications
- **Favorites** - Save favorite restaurants
- **Categories** - Browse food categories
- **NGOs** - View and manage NGO profiles

## 🔐 Authentication

Token-based authentication with automatic token management:

```javascript
import { authService } from './services';

// Register
await authService.register({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'securepass123',
  user_type: 'consumer'
});

// Login
await authService.login('john_doe', 'securepass123');

// Token is automatically included in all API requests

// Logout
await authService.logout();
```

## 🌍 Geolocation

Built-in geolocation support for finding nearby restaurants:

```javascript
import { useGeolocation } from './hooks';
import { listingService } from './services';

function NearbyListings() {
  const { location } = useGeolocation();
  
  useEffect(() => {
    if (location) {
      const nearby = await listingService.getNearbyListings(
        location.lat,
        location.lng,
        10 // radius in km
      );
    }
  }, [location]);
}
```

## 🎨 Example Components

Working example components are provided in `src/examples/`:

1. **AuthExample.jsx** - Complete authentication flow
   - Login and registration forms
   - User profile display
   - Error handling

2. **ListingsExample.jsx** - Food listings with filters
   - Category filtering
   - Search functionality
   - Geolocation integration
   - Listing cards with pricing

## 📦 Dependencies

Core dependencies:
- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **Axios** - HTTP client for API calls

Development dependencies:
- **ESLint** - Code linting
- **@vitejs/plugin-react-swc** - Fast refresh

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file with:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=ReeFood
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_GEOLOCATION=true
VITE_DEFAULT_LAT=40.712776
VITE_DEFAULT_LNG=-74.005974
```

## 🧪 Testing the API

1. **Start the Django backend**:
   ```bash
   cd ../django-proyecto
   python manage.py runserver
   ```

2. **Test API connection**:
   ```javascript
   import { categoryService } from './services';
   
   const categories = await categoryService.getCategories();
   console.log(categories);
   ```

3. **Use example components**:
   - Import and render `AuthExample` or `ListingsExample`
   - Test authentication flow
   - Browse listings with filters

## 📖 Additional Documentation

- **[API_IMPLEMENTATION.md](./API_IMPLEMENTATION.md)** - Complete API integration guide
- **[src/services/README.md](./src/services/README.md)** - Detailed service documentation
- **[../django-proyecto/API_DOCUMENTATION.md](../django-proyecto/API_DOCUMENTATION.md)** - Backend API reference
- **[../django-proyecto/README.md](../django-proyecto/README.md)** - Backend setup guide

## 🚦 Development Roadmap

### ✅ Completed
- [x] API service layer implementation
- [x] Authentication with token management
- [x] Custom React hooks (useAuth, useApi, useGeolocation)
- [x] Utility functions (formatters, validators, helpers)
- [x] Example components
- [x] Environment configuration

### 🔄 Next Steps
- [ ] UI component library
- [ ] Page layouts and routing (React Router)
- [ ] State management (Context API or Redux)
- [ ] Styling (CSS Modules, Styled Components, or Tailwind)
- [ ] Map integration (Google Maps or Leaflet)
- [ ] Image upload and preview
- [ ] Form validation
- [ ] Loading states and error boundaries
- [ ] Responsive mobile design
- [ ] PWA features
- [ ] Performance optimization
- [ ] Unit and integration tests

## 🤝 Integration

### With Django Backend

The API services connect to Django REST API:
- Token authentication
- All CRUD operations
- File uploads for images
- Geolocation queries

### With Spring Boot Admin Panel

The web client can coexist with the admin panel:
- Shared authentication backend
- Different user interfaces for different roles
- Restaurant management in admin panel
- Consumer browsing in web client

## 💡 Best Practices

1. **Error Handling**: All API calls include try-catch blocks
2. **Loading States**: Show loading indicators during API calls
3. **Token Management**: Automatic token storage and inclusion
4. **Validation**: Client-side validation before API calls
5. **Responsive Design**: Mobile-first approach
6. **Security**: Never expose tokens or sensitive data

## 🐛 Troubleshooting

### API Connection Issues
- Verify Django backend is running on `http://localhost:8000`
- Check `.env` file has correct `VITE_API_BASE_URL`
- Ensure CORS is enabled in Django settings

### Authentication Problems
- Clear localStorage: `localStorage.clear()`
- Check token expiration
- Verify credentials are correct

### Geolocation Not Working
- Enable location permissions in browser
- Use HTTPS in production (required for geolocation)
- Provide fallback coordinates

## 📄 License

[Specify your license]

## 👥 Contributors

[List contributors]

---

**Version**: 1.0.0  
**Last Updated**: January 2024  
**Tech Stack**: React 19 + Vite 7 + Axios
