import { ReactNode } from "react";
import { PartnerSidebar } from "../components/PartnerSidebar";

export const PartnerLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <PartnerSidebar />
      <main className="flex-1 pt-5 pb-4 px-12">{children}</main>
    </div>
  );
};
