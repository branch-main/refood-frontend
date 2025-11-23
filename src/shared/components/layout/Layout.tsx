import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MenuCart } from "@/features/menu/components";
import { Outlet, ScrollRestoration } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <MenuCart />
      <main className="flex-1 mt-14">
        <Outlet />
        <ScrollRestoration />
      </main>
      <Footer />
    </div>
  );
};
