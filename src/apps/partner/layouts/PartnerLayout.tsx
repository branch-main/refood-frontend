import { PartnerSidebar } from "../components/PartnerSidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { RestaurantProvider } from "../contexts";

export const PartnerLayout = () => {
  return (
    <RestaurantProvider>
      <div className="min-h-screen flex bg-gray-50">
        <PartnerSidebar />

        <main className="flex-1 pt-5 pb-4 px-12">
          <Outlet />
          <ScrollRestoration />
        </main>
      </div>
    </RestaurantProvider>
  );
};
