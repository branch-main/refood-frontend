import { useLocation, Link, useNavigate } from "react-router-dom";
import { FiHome, FiShoppingBag, FiBarChart2, FiLogOut } from "react-icons/fi";
import { useAuthContext } from "@/shared/contexts";
import { AiOutlineShop } from "react-icons/ai";

const menuItems = [
  { path: "/partner", label: "Dashboard", icon: FiHome },
  { path: "/partner/restaurants", label: "Restaurantes", icon: AiOutlineShop },
  { path: "/partner/orders", label: "Pedidos", icon: FiShoppingBag },
  { path: "/partner/analytics", label: "Analíticas", icon: FiBarChart2 },
];

export const PartnerSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="sticky top-0 w-[250px] p-4 flex flex-col justify-between h-screen">
      <div>
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
                className={`inline-flex gap-4 text-sm items-center p-2.5 rounded-lg transition-colors duration-250 no-underline ${
                  isActive
                    ? "text-red-500 bg-red-100"
                    : "text-neutral-600 hover:bg-red-50"
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="inline-flex gap-4 text-sm items-center p-2.5 rounded-lg text-red-600 hover:bg-red-100 transition-colors duration-250 w-full font-medium"
      >
        <FiLogOut size={18} />
        Cerrar Sesión
      </button>
    </aside>
  );
};
