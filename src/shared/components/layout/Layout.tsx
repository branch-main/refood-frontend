import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MenuCart } from "@/features/menu/components";
import { ReactNode } from "react";

export const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <MenuCart />
      <main className="flex-1 bg-gray-50">{children}</main>
      <Footer />
    </div>
  );
};
