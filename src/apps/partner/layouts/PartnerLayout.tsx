import { PartnerSidebar } from "../components/PartnerSidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { RestaurantProvider } from "../contexts";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export const PartnerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <RestaurantProvider>
      <div className="min-h-screen flex bg-gray-50">
        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <PartnerSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Main content */}
        <main className="flex-1 pt-5 pb-4 px-4 md:px-8 lg:px-12 min-w-0">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center gap-3 mb-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiMenu size={24} className="text-gray-600" />
            </button>
            <span className="font-bold text-red-500">
              <span className="text-gray-800">Re</span>Food
            </span>
          </div>

          <Outlet />
          <ScrollRestoration />
        </main>
      </div>
    </RestaurantProvider>
  );
};
