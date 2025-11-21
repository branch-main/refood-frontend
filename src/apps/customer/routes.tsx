import {
  Outlet,
  redirect,
  RouteObject,
  ScrollRestoration,
} from "react-router-dom";
import {
  Home,
  Login,
  Register,
  Menu,
  Restaurants,
  Restaurant,
  Profile,
  Checkout,
} from "@/pages";
import { Layout } from "@/shared/components/layout";
import { authService } from "@/shared/services";
import { AuthProvider } from "@/shared/contexts";
import { CartProvider } from "@/features/cart/contexts";
import { RestaurantProvider } from "@/features/restaurants/contexts";

const requireAuth = async () => {
  const user = await authService.getCurrentUser().catch(() => null);
  if (!user) {
    return redirect("/login");
  }
  return null;
};

const RootLayout = () => (
  <AuthProvider>
    <CartProvider>
      <RestaurantProvider>
        <Layout>
          <Outlet />
          <ScrollRestoration />
        </Layout>
      </RestaurantProvider>
    </CartProvider>
  </AuthProvider>
);

export const routes: RouteObject = {
  element: <RootLayout />,
  children: [
    { index: true, element: <Home /> },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "checkout", element: <Checkout />, loader: requireAuth },
    { path: "menu", element: <Menu /> },
    { path: "restaurants", element: <Restaurants /> },
    { path: "restaurants/:id", element: <Restaurant /> },

    {
      path: "profile",
      loader: requireAuth,
      element: <Profile />,
    },
  ],
};
