import { Navigate, RouteObject } from "react-router-dom";
import { PartnerLayout } from "./layout/PartnerLayout";
import {
  PartnerDashboard,
  PartnerMenu,
  PartnerOrders,
  PartnerAnalytics,
  PartnerSettings,
  PartnerLogin,
} from "./pages";
import { useAuthContext } from "@/features/auth/contexts";

// Protected route for partners
const PartnerProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isPartner } = useAuthContext();

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Cargando...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated or not a partner
  if (!user || !isPartner) {
    return <Navigate to="/partner/login" replace />;
  }

  return <>{children}</>;
};

export const routes: RouteObject[] = [
  {
    path: "/partner/login",
    element: <PartnerLogin />,
  },
  {
    path: "/partner",
    element: <PartnerLayout />,
    children: [
      { index: true, element: <Navigate to="/partner/dashboard" replace /> },
      { path: "dashboard", element: <PartnerDashboard /> },
      { path: "menu", element: <PartnerMenu /> },
      { path: "orders", element: <PartnerOrders /> },
      { path: "analytics", element: <PartnerAnalytics /> },
      { path: "settings", element: <PartnerSettings /> },
    ],
  },
];
