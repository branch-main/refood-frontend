import {
  Outlet,
  redirect,
  RouteObject,
  ScrollRestoration,
} from "react-router-dom";
import { PartnerLayout } from "./layouts/PartnerLayout";
import {
  PartnerDashboard,
  PartnerRestaurants,
  PartnerOrders,
  PartnerAnalytics,
  PartnerSettings,
} from "./pages";
import { AuthProvider } from "@/shared/contexts";
import { authService } from "@/shared/services";

const requireAuth = async () => {
  const user = await authService.getCurrentUser().catch(() => null);
  if (!user) {
    return redirect("/login");
  }
  return null;
};

const RootLayout = () => (
  <AuthProvider>
    <PartnerLayout>
      <Outlet />
      <ScrollRestoration />
    </PartnerLayout>
  </AuthProvider>
);

export const routes: RouteObject = {
  path: "/partner",
  loader: requireAuth,
  element: <RootLayout />,
  children: [
    { index: true, element: <PartnerDashboard /> },
    { path: "restaurants", element: <PartnerRestaurants /> },
    { path: "orders", element: <PartnerOrders /> },
    { path: "analytics", element: <PartnerAnalytics /> },
    { path: "settings", element: <PartnerSettings /> },
  ],
};
