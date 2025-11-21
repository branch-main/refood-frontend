import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/features/auth/contexts";
import { routes as customerRoutes } from "./customer/routes";
import { routes as partnerRoutes } from "./partner/routes";

const queryClient = new QueryClient();

const router = createBrowserRouter([...customerRoutes, ...partnerRoutes]);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
