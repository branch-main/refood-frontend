import { Outlet } from "react-router-dom";
import { PartnerSidebar } from "../shared/components/common/PartnerSidebar";

export const PartnerLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <PartnerSidebar />
      <div className="flex-1 py-4 pr-4 mt-16">
        <Outlet />
      </div>
    </div>
  );
};
