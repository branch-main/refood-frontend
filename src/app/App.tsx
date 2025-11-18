import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { useAuth } from "@/features/auth/hooks";
import { Layout } from "@/shared/components/layout";
import {
  Home,
  Login,
  Register,
  MenuItems,
  MenuItemPage,
  Restaurants,
  Restaurant,
  Profile,
} from "@/pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/features/auth/contexts";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <Layout>
        <Outlet />
        <ScrollRestoration />
      </Layout>
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/menu", element: <MenuItems /> },
      { path: "/menu/:id", element: <MenuItemPage /> },
      { path: "/restaurants", element: <Restaurants /> },
      { path: "/restaurants/:id", element: <Restaurant /> },
      {
        element: <ProtectedRoute />,
        children: [{ path: "/profile", element: <Profile /> }],
      },
    ],
  },
]);

const queryClient = new QueryClient();

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);

export default App;
