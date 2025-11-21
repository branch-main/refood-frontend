import { useRestaurant } from "@/shared/hooks";
import { Order, OrderStatus } from "@/shared/types";
import { formatPrice, formatTime } from "@/shared/utils";
import { Link } from "react-router-dom";

const statusToText = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return "Pendiente";
    case OrderStatus.CONFIRMED:
      return "Confirmado";
    case OrderStatus.DELIVERYING:
      return "En camino";
    case OrderStatus.COMPLETED:
      return "Completado";
    default:
      return "Desconocido";
  }
};

const statusToColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return "text-yellow-600 bg-yellow-100";
    case OrderStatus.CONFIRMED:
      return "text-blue-600 bg-blue-100";
    case OrderStatus.DELIVERYING:
      return "text-orange-600 bg-orange-100";
    case OrderStatus.COMPLETED:
      return "text-green-600 bg-green-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

const OrderEntry = ({ order }: { order: Order }) => {
  const { data: restaurant } = useRestaurant(order.restaurantId);

  return (
    <tr key={order.id} className="text-sm">
      <td className="py-2 text-gray-800 hover:text-red-500 transition-colors duration-200">
        <Link to={`/orders/${order.id}`}>{order.id}</Link>
      </td>

      <td className="py-2 text-gray-800 hover:text-red-500 transition-colors duration-200">
        <Link to={`/restaurants/${restaurant?.id}`}>
          {restaurant ? restaurant.name : "Cargando..."}
        </Link>
      </td>

      <td className="py-2 text-center">
        <span
          className={`${statusToColor(order.status)} px-2 py-0.5 rounded-md font-medium text-xs`}
        >
          {statusToText(order.status)}
        </span>
      </td>

      <td className="py-2 text-gray-800 text-center">{formatPrice(24.2)}</td>

      <td className="py-2 text-gray-800 text-center">
        {formatTime("12:00:00")}
      </td>
    </tr>
  );
};

export const OrderTable = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse overflow-hidden">
        <thead className="text-center text-gray-400 text-xs uppercase">
          <th className="pb-2 text-left">Id</th>
          <th className="pb-2 text-left">Restaurante</th>
          <th className="pb-2">Estado</th>
          <th className="pb-2">Total</th>
          <th className="pb-2">Hora</th>
        </thead>
        <tbody className="">
          {orders.map((order) => (
            <OrderEntry key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
