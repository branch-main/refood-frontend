import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes as customerRoutes } from "./customer/routes";
import { routes as partnerRoutes } from "./partner/routes";

const queryClient = new QueryClient();

const router = createBrowserRouter([customerRoutes, partnerRoutes]);

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
