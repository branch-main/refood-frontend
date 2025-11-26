import { Navigate, Outlet, redirect, RouteObject } from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Menu,
  Restaurants,
  Restaurant,
  Checkout,
  Profile,
  Orders,
  Order,
  Notifications,
  Favorites,
  PayPalCallback,
  PaymentFailed,
  Contact,
  PartnerInfo,
} from "@/pages";
import { Layout } from "@/shared/components/layout";
import { authService } from "@/shared/services";
import { AuthProvider } from "@/shared/contexts";
import { CartProvider } from "@/features/cart/contexts";
import { RestaurantProvider } from "@/features/restaurants/contexts";
import { ProfileLayout } from "@/features/profile/layouts";
import { AuthLayout } from "@/features/auth/layouts";
import { CheckoutLayout } from "@/features/cart/layouts";

const requireAuth = async () => {
  const user = await authService.getCurrentUser().catch(() => null);
  if (!user) {
    return redirect("/login");
  }
  return null;
};

const RootProvider = () => (
  <AuthProvider>
    <CartProvider>
      <RestaurantProvider>
        <Outlet />
      </RestaurantProvider>
    </CartProvider>
  </AuthProvider>
);

export const routes: RouteObject = {
  element: <RootProvider />,
  children: [
    {
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "menu", element: <Menu /> },
        { path: "restaurants", element: <Restaurants /> },
        { path: "restaurants/:id", element: <Restaurant /> },
        { path: "contact", element: <Contact /> },
        { path: "partner-info", element: <PartnerInfo /> },
      ],
    },

    {
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },

    {
      path: "checkout",
      element: <CheckoutLayout />,
      loader: requireAuth,
      children: [{ index: true, element: <Checkout /> }],
    },

    {
      path: "paypal-callback",
      element: <PayPalCallback />,
    },

    {
      path: "payment-failed",
      element: <PaymentFailed />,
    },

    {
      path: "profile",
      loader: requireAuth,
      element: <ProfileLayout />,
      children: [
        { index: true, element: <Navigate to="settings" replace /> },
        { path: "settings", element: <Profile /> },
        { path: "notifications", element: <Notifications /> },
        { path: "favorites", element: <Favorites /> },
        { path: "orders", element: <Orders /> },
        { path: "orders/:orderId", element: <Order /> },
      ],
    },
  ],
};
