import { useLocation, Link, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiBarChart2, FiLogOut, FiMenu } from "react-icons/fi";
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
  { path: "/partner/menu", label: "Menú", icon: MdRestaurantMenu },
  { path: "/partner/orders", label: "Pedidos", icon: FiShoppingBag },
];

export const PartnerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { restaurants, selectedRestaurant, setSelectedRestaurantId } = useRestaurantContext();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <aside
      className={`sticky top-0 h-screen bg-white shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] flex flex-col transition-all overflow-x-hidden overflow-y-auto ${isCollapsed ? "w-16" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {!isCollapsed && (
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 rounded-lg bg-[#B21F1F] flex items-center justify-center">
              <img src="/logo.png" alt="ReFood" className="h-5 w-auto" />
            </div>
            <span className="font-bold text-gray-900">ReFood</span>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiMenu size={18} className="text-gray-600" />
        </button>
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
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors no-underline ${
                isCollapsed ? "justify-center" : ""
              } ${
                active
                  ? "bg-red-50 text-red-500 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm">{item.label}</span>
              )}
            </Link>
          );
        })}

        {/* Restaurant Selector */}
        {!isCollapsed && restaurants.length > 0 && (
          <div className="pt-4 mt-4 border-t border-gray-100">
            <p className="px-3 mb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
              Restaurante
            </p>
            <div className="px-1">
              <Select
                options={restaurants.map((r) => ({ value: r.id, label: r.name }))}
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
            {!isCollapsed && (
              <p className="px-3 mb-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                Gestión
              </p>
            )}
            {restaurantMenuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors no-underline ${
                    isCollapsed ? "justify-center" : ""
                  } ${
                    active
                      ? "bg-red-50 text-red-500 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm">{item.label}</span>
                  )}
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
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "Cerrar sesión" : undefined}
        >
          <FiLogOut size={20} className="flex-shrink-0" />
          {!isCollapsed && (
            <span className="text-sm">Cerrar Sesión</span>
          )}
        </button>
      </div>
    </aside>
  );
};

