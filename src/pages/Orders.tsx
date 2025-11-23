import { useAuth, useOrdersByCustomer } from "@/shared/hooks";
import { Order as OrderType } from "@/shared/types";
import { Link } from "react-router-dom";

const Order = ({ order }: { order: OrderType }) => {
  return (
    <div key={order.id} className="p-4 mt-4 bg-neutral-50 rounded-lg">
      <div className="flex justify-between">
        <Link to={`/profile/orders/${order.id}`} className="font-semibold">
          Pedido ID: {order.id}
        </Link>
        <span className="text-sm text-gray-600">Estado: {order.status}</span>
      </div>
    </div>
  );
};

export const Orders = () => {
  const { user } = useAuth();
  const { data: orders } = useOrdersByCustomer(user?.id);

  if (!orders) return;

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">¡Mis últimos pedidos!</h1>
      <p className="mt-1 text-sm text-gray-500 border-b border-gray-200 pb-4">
        Hazle seguimiento al detalle a tus pedidos anteriores y solicita ayuda
        si hay algún inconveniente con una de tus compras.
      </p>

      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
};
