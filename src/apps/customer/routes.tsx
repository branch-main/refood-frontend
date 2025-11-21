import { Navigate } from "react-router-dom";
import { CustomerLayout } from "./layout/CustomerLayout";
import {
  Home,
  Login,
  Register,
  MenuItems,
  MenuItemPage,
  Restaurants,
  Restaurant,
  Profile,
  Partners,
} from "@/pages";

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // TODO: Implement auth check
  const isAuthenticated = true; // Replace with actual auth check
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export const routes = [
  {
    element: <CustomerLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/partners", element: <Partners /> },
      { path: "/menu", element: <MenuItems /> },
      { path: "/menu/:id", element: <MenuItemPage /> },
      { path: "/restaurants", element: <Restaurants /> },
      { path: "/restaurants/:id", element: <Restaurant /> },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
];
