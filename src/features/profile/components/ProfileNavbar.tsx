import { Link } from "react-router-dom";
import { LocationDisplay } from "@/shared/components/common";

export const ProfileNavbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 h-15 flex items-center px-8 justify-between">
      <Link
        to="/"
        className="flex items-center gap-2 no-underline transition-all duration-200 hover:scale-105"
      >
        <img src="/logo.png" alt="ReFood" className="h-10 w-auto" />
      </Link>

      <LocationDisplay variant="navbar" />
    </nav>
  );
};
