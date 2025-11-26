import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  FiShoppingBag,
  FiBarChart2,
  FiLogOut,
  FiMenu,
  FiGrid,
  FiX,
} from "react-icons/fi";
import { MdRestaurantMenu, MdDashboard } from "react-icons/md";
import { useAuthContext } from "@/shared/contexts";
import { AiOutlineShop } from "react-icons/ai";
import { useState } from "react";
import { useRestaurantContext } from "../contexts";
import { Select } from "@/shared/components/ui";

const generalMenuItems = [
  { path: "/partner", label: "Dashboard", icon: MdDashboard, exact: true },
  { path: "/partner/restaurants", label: "Restaurantes", icon: AiOutlineShop },
  { path: "/partner/analytics", label: "Analíticas", icon: FiBarChart2 },
];

const restaurantMenuItems = [
  { path: "/partner/categories", label: "Categorías", icon: FiGrid },
  { path: "/partner/menu", label: "Menú", icon: MdRestaurantMenu },
  { path: "/partner/orders", label: "Pedidos", icon: FiShoppingBag },
];

interface PartnerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerSidebar = ({ isOpen, onClose }: PartnerSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { restaurants, selectedRestaurant, setSelectedRestaurantId } =
    useRestaurantContext();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const handleNavClick = () => {
    // Close sidebar on mobile when navigating
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <aside
      className={`
        fixed lg:sticky top-0 h-screen bg-white shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] 
        flex flex-col transition-all overflow-x-hidden overflow-y-auto z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${isCollapsed ? "lg:w-16" : "w-64"}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {!isCollapsed && (
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="font-bold text-red-500">
              <span className="text-gray-800">Re</span>
              Food
            </span>
          </Link>
        )}
        <div className="flex items-center gap-1">
          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
          >
            <FiX size={18} className="text-gray-600" />
          </button>
          {/* Collapse button for desktop */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden lg:block"
          >
            <FiMenu size={18} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-2">
        {/* General Menu Items */}
        {generalMenuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path, item.exact);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors no-underline ${
                isCollapsed ? "lg:justify-center" : ""
              } ${
                active
                  ? "bg-red-50 text-red-500 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className={`text-sm ${isCollapsed ? "lg:hidden" : ""}`}>{item.label}</span>
            </Link>
          );
        })}

        {/* Restaurant Selector */}
        {restaurants.length > 0 && (
          <div className={`pt-4 mt-4 border-t border-gray-100 ${isCollapsed ? "lg:hidden" : ""}`}>
            <p className="px-3 mb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Restaurante
            </p>
            <div className="px-1">
              <Select
                options={restaurants.map((r) => ({
                  value: r.id,
                  label: r.name,
                }))}
                value={selectedRestaurant?.id || null}
                onChange={(value) => setSelectedRestaurantId(Number(value))}
                placeholder="Seleccionar..."
              />
            </div>
          </div>
        )}

        {/* Restaurant-specific Menu Items */}
        {selectedRestaurant && (
          <div className={`${isCollapsed ? "" : "pt-3"} space-y-2`}>
            <p className={`px-3 mb-2 text-xs font-medium text-gray-400 uppercase tracking-wider ${isCollapsed ? "lg:hidden" : ""}`}>
              Gestión
            </p>
            {restaurantMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors no-underline ${
                    isCollapsed ? "lg:justify-center" : ""
                  } ${
                    active
                      ? "bg-red-50 text-red-500 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <span className={`text-sm ${isCollapsed ? "lg:hidden" : ""}`}>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors ${
            isCollapsed ? "lg:justify-center" : ""
          }`}
          title={isCollapsed ? "Cerrar sesión" : undefined}
        >
          <FiLogOut size={20} className="flex-shrink-0" />
          <span className={`text-sm ${isCollapsed ? "lg:hidden" : ""}`}>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};
