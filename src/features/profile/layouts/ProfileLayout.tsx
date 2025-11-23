import { ProfileNavbar, ProfileSidebar } from "../components";
import { Outlet, ScrollRestoration } from "react-router-dom";

export const ProfileLayout = () => {
  return (
    <div className="min-h-screen">
      <ProfileNavbar />

      <div className="mt-15 mx-20 py-5 flex gap-5">
        <div className="w-1/5">
          <ProfileSidebar />
        </div>

        <div className="bg-white flex-1 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]">
          <Outlet />
          <ScrollRestoration />
        </div>
      </div>
    </div>
  );
};
