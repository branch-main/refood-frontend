import { useLocation, Link, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiBarChart2, FiLogOut, FiMenu } from "react-icons/fi";
import { MdRestaurantMenu, MdDashboard } from "react-icons/md";
import { useAuthContext } from "@/shared/contexts";
import { AiOutlineShop } from "react-icons/ai";
import { useState } from "react";

const menuItems = [
  { path: "/partner", label: "Dashboard", icon: MdDashboard },
  { path: "/partner/restaurants", label: "Restaurantes", icon: AiOutlineShop },
  { path: "/partner/menu", label: "Menú", icon: MdRestaurantMenu },
  { path: "/partner/orders", label: "Pedidos", icon: FiShoppingBag },
  { path: "/partner/analytics", label: "Analíticas", icon: FiBarChart2 },
];

export const PartnerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <aside
      className={`sticky top-0 h-screen bg-white shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] flex flex-col transition-all overflow-hidden ${isCollapsed ? "w-16" : "w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
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
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors no-underline ${
                isCollapsed ? "justify-center" : ""
              } ${
                active
                  ? "bg-red-100 text-red-500 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className={`group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? "Cerrar sesión" : undefined}
        >
          <FiLogOut size={20} className="flex-shrink-0" />
          {!isCollapsed && (
            <span className="font-medium text-sm">Cerrar Sesión</span>
          )}
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
              Cerrar Sesión
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};
