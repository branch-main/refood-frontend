import { ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import { Layout } from "./components/layout/Layout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { MenuItemsPage } from "./pages/MenuItemsPage";
import { MenuItemDetailPage } from "./pages/MenuItemDetailPage";
import { RestaurantsPage } from "./pages/RestaurantsPage";
import { RestaurantDetailPage } from "./pages/RestaurantDetailPage";
import { OrdersPage } from "./pages/OrdersPage";
import { ProfilePage } from "./pages/ProfilePage";
import { FavoritesPage } from "./pages/FavoritesPage";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Routes Component
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/menu" element={<MenuItemsPage />} />
      <Route path="/menu/:id" element={<MenuItemDetailPage />} />
      <Route path="/restaurants" element={<RestaurantsPage />} />
      <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <FavoritesPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
