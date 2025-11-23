import { PartnerSidebar } from "../components/PartnerSidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";

export const PartnerLayout = () => {
  return (
    <div className="min-h-screen flex">
      <PartnerSidebar />

      <main className="flex-1 pt-5 pb-4 px-12">
        <Outlet />
        <ScrollRestoration />
      </main>
    </div>
  );
};
