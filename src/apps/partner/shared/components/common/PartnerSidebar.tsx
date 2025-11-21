import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiPackage,
  FiShoppingBag,
  FiBarChart2,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useState } from "react";
import { useAuthContext } from "@/features/auth/contexts";

const menuItems = [
  { path: "/partner/dashboard", label: "Dashboard", icon: FiHome },
  { path: "/partner/menu", label: "Mi Menú", icon: FiPackage },
  { path: "/partner/orders", label: "Pedidos", icon: FiShoppingBag },
  { path: "/partner/analytics", label: "Analíticas", icon: FiBarChart2 },
  { path: "/partner/settings", label: "Configuración", icon: FiSettings },
];

export const PartnerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/partner/login");
  };

  return (
    <aside className={`min-h-screen w-[225px]`}>
      <div className="hidden lg:block p-4 min-h-screen">
        <h1 className="py-2 flex items-start gap-2 font-bold text-lg uppercase text-black mb-4 tracking-wide">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img src="/logo.png" alt="ReFood" className="h-8 w-auto" />
          </Link>
          Socios
        </h1>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex gap-4 text-sm items-center p-2.5 rounded-xl transition-colors duration-250 no-underline ${
                  isActive
                    ? "text-red-500 bg-red-100 font-semibold"
                    : "text-neutral-600 hover:text-red-500 hover:bg-red-100"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="inline-flex gap-4 text-sm items-center p-2.5 rounded-xl text-red-600 hover:bg-red-100 transition-colors duration-250 w-full font-medium"
          >
            <FiLogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden p-4 mt-16">
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`inline-flex gap-4 text-sm items-center p-2.5 rounded-xl transition-colors duration-250 no-underline ${
                  isActive
                    ? "text-red-500 bg-red-100 font-semibold"
                    : "text-neutral-600 hover:text-red-500 hover:bg-red-100"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
