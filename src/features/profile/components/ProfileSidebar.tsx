import { useAuth } from "@/shared/hooks";
import { getFallbackImage } from "@/shared/utils";
import { GoHeart, GoClock } from "react-icons/go";
import { IoSettingsOutline, IoNotificationsOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const profileLinks = [
  {
    to: "/profile/settings",
    icon: IoSettingsOutline,
    label: "Ajustes de cuenta",
  },
  {
    to: "/profile/notifications",
    icon: IoNotificationsOutline,
    label: "Centro de notificaciones",
  },
  {
    to: "/profile/favorites",
    icon: GoHeart,
    label: "Favoritos",
  },
  {
    to: "/profile/orders",
    icon: GoClock,
    label: "Últimas órdenes",
  },
];

export const ProfileSidebar = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="bg-white sticky top-20 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)]">
      <div className="p-6 border-b border-gray-200 flex justify-center items-center gap-3">
        <img
          alt={user.firstName}
          src={getFallbackImage(user.firstName, user.image)}
          className="h-14 w-14 rounded-full object-cover shadow-lg border-white"
        />
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Mi perfil</span>
          <span className="text-xl text-gray-800 font-semibold">
            {user?.firstName}
          </span>
        </div>
      </div>

      {profileLinks.map(({ to, icon: Icon, label }) => {
        const isActive = pathname.startsWith(to);

        return (
          <Link
            key={to}
            to={to}
            className={`flex items-center p-4 gap-3 border-b border-gray-200 last:border-0 cursor-pointer transition-colors duration-300
              ${isActive ? "text-red-500" : "text-gray-500 hover:text-red-500"}
            `}
          >
            <Icon size={16} className="text-red-500 shrink-0" />
            <span className="text-sm">{label}</span>
          </Link>
        );
      })}
    </div>
  );
};
