import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MenuCart } from "@/features/menu/components";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <MenuCart />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
