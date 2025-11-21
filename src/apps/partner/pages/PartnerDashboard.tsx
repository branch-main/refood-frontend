import { useMenu } from "@/shared/hooks";
import { MenuItemTable } from "../features/menu/components/MenuItemTable";

export const PartnerDashboard = () => {
  const { data: items } = useMenu();
  if (!items) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-7">Dashboard</h1>
      <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.0225)] rounded-2xl">
        <MenuItemTable items={items} />
      </div>
    </>
  );
};
