import { useMenu, useRestaurant } from "@/shared/hooks";
import { Order, OrderStatus } from "@/shared/types";
import {
  DashboardCard,
  StatIndicator,
  WeeklyEarningsChart,
} from "../features/dashboard/components";
import { MenuItemTable } from "../features/menu/components";
import { OrderTable } from "../features/orders/components";
import { RestaurantCard } from "../features/restaurants/components/RestaurantCard";
import { formatPrice } from "@/shared/utils";

const order: Order = {
  id: 324234,
  customerId: 1,
  restaurantId: 1,
  deliveryDriverId: null,
  status: OrderStatus.PENDING,
  items: [],
  deliveryFee: 25.5,
  deliveryAddress: "Calle Falsa 123",
};

export const PartnerDashboard = () => {
  const { data: items } = useMenu();
  const { data: restaurant } = useRestaurant(2);

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-7">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <StatIndicator
          title="Ganancias del día"
          current={213}
          previous={100}
          formatter={formatPrice}
        />
        <StatIndicator title="Pedidos del día" current={140} previous={100} />
        <StatIndicator title="Productos del día" current={21} previous={32} />

        <DashboardCard title="Pedidos recientes" className="col-span-2">
          <OrderTable orders={[order, order, order, order, order]} />
        </DashboardCard>

        <DashboardCard title="Ganancias semanales">
          <WeeklyEarningsChart data={[120, 200, 180, 240, 300, 280, 350]} />
        </DashboardCard>

        <DashboardCard title="Opiniones recientes">
          <span>PLACEHOLDER</span>
        </DashboardCard>

        <DashboardCard title="Más vendidos" className="col-span-2">
          {items && <MenuItemTable items={items.slice(5)} />}
        </DashboardCard>
      </div>
    </>
  );
};
