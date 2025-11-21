import { Outlet, ScrollRestoration } from "react-router-dom";
import { Layout } from "@/shared/components/layout";
import { RestaurantProvider } from "@/features/restaurants/contexts";
import { CartProvider } from "@/features/cart/contexts";

export const CustomerLayout = () => {
  return (
    <RestaurantProvider>
      <CartProvider>
        <Layout>
          <Outlet />
          <ScrollRestoration />
        </Layout>
      </CartProvider>
    </RestaurantProvider>
  );
};
