import { useAuth, useOrdersByCustomer, useRestaurant } from "@/shared/hooks";
import { Order as OrderType } from "@/shared/types";
import {
  formatPrice,
  getFallbackImage,
  getStatusIcon,
  getStatusText,
  getStatusColor,
  formatDate,
} from "@/shared/utils";
import { Link } from "react-router-dom";

const Order = ({ order }: { order: OrderType }) => {
  const { data: restaurant } = useRestaurant(order.restaurantId);
  const quantity = order.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="mt-5 rounded-lg p-5 border border-gray-200">
      {restaurant && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={getFallbackImage(restaurant.name, restaurant.logo)}
              alt={restaurant.name}
              className="h-11 w-11 object-cover rounded-full"
            />
            <span className="font-semibold text-gray-800 text-lg">
              {restaurant.name}
            </span>
          </div>

          <span
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full ${getStatusColor(
              order.status,
            )}`}
          >
            {getStatusIcon(order.status)}
            {getStatusText(order.status)}
          </span>
        </div>
      )}

      <div className="mt-4 grid grid-rows-2 grid-cols-2 text-sm">
        <div className="flex gap-2">
          Cantidad:
          <p className="text-gray-500">{quantity}</p>
        </div>
        <div className="flex gap-2">
          Fecha:
          <p className="text-gray-500">{formatDate(order.createdAt)}</p>
        </div>
        <div className="flex gap-2">
          Total:
          <p className="text-gray-500">{formatPrice(order.totalPrice)}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-4">
        <Link
          to={`/profile/orders/${order.id}`}
          className="text-sm text-white bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Ver detalles
        </Link>
        <Link
          to={`/profile/orders/${order.id}`}
          className="text-sm text-red-500 border border-red-500 px-5 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
        >
          Imprimir comprobante
        </Link>
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
