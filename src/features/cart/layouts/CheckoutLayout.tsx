import { FaLocationDot } from "react-icons/fa6";
import { Link, Outlet, ScrollRestoration } from "react-router-dom";

export const CheckoutLayout = () => {
  return (
    <div className="min-h-screen">
      <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 h-15 flex items-center px-8 justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 no-underline transition-all duration-200 hover:scale-105"
        >
          <img src="/logo.png" alt="ReFood" className="h-10 w-auto" />
        </Link>

        <span
          className="text-red-500 hover:text-red-600 transition-colors cursor-pointer text-xs font-bold inline-flex items-center gap-3"
          onClick={() => alert("ubcacion")}
        >
          <FaLocationDot className="w-4 h-4" />
          Av. Victor Larco Herrera 777
        </span>
      </nav>

      <main className="mt-15 flex max-w-4xl 2xl:max-w-5xl mx-auto gap-4 p-4">
        <Outlet />
        <ScrollRestoration />
      </main>
    </div>
  );
};
