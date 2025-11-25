import { useRestaurant } from "@/shared/hooks";
import { Order, OrderStatus } from "@/shared/types";
import { formatPrice, formatTimeFromDate } from "@/shared/utils";

const statusToText = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return "Pago Pendiente";
    case OrderStatus.CONFIRMED:
      return "Confirmado";
    case OrderStatus.PREPARING:
      return "Preparando";
    case OrderStatus.READY:
      return "Listo";
    case OrderStatus.DELIVERING:
      return "En camino";
    case OrderStatus.COMPLETED:
      return "Completado";
    case OrderStatus.CANCELLED:
      return "Cancelado";
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
    case OrderStatus.PREPARING:
      return "text-purple-600 bg-purple-100";
    case OrderStatus.READY:
      return "text-teal-600 bg-teal-100";
    case OrderStatus.DELIVERING:
      return "text-orange-600 bg-orange-100";
    case OrderStatus.COMPLETED:
      return "text-green-600 bg-green-100";
    case OrderStatus.CANCELLED:
      return "text-red-600 bg-red-100";
    default:
      return "text-gray-600 bg-gray-100";
  }
};

interface OrderEntryProps {
  order: Order;
  onOrderClick?: (order: Order) => void;
}

const OrderEntry = ({ order, onOrderClick }: OrderEntryProps) => {
  const { data: restaurant } = useRestaurant(order.restaurantId);

  // Format order ID (show first 8 characters of UUID)
  const shortId = typeof order.id === "string" 
    ? order.id.substring(0, 8) 
    : order.id;

  // Format time from createdAt
  const orderTime = order.createdAt 
    ? formatTimeFromDate(order.createdAt) 
    : "-";

  return (
    <tr key={order.id} className="text-sm">
      <td className="py-2 text-gray-800">
        <button
          onClick={() => onOrderClick?.(order)}
          className="hover:text-red-500 transition-colors duration-200 cursor-pointer"
        >
          {shortId}...
        </button>
      </td>

      <td className="py-2 text-gray-800">
        {restaurant ? restaurant.name : "Cargando..."}
      </td>

      <td className="py-2 text-center">
        <span
          className={`${statusToColor(order.status)} px-2 py-0.5 rounded-md font-medium text-xs`}
        >
          {statusToText(order.status)}
        </span>
      </td>

      <td className="py-2 text-gray-800 text-center">
        {formatPrice(order.totalPrice ?? 0)}
      </td>

      <td className="py-2 text-gray-800 text-center">
        {orderTime}
      </td>
    </tr>
  );
};

interface OrderTableProps {
  orders: Order[];
  onOrderClick?: (order: Order) => void;
}

export const OrderTable = ({ orders, onOrderClick }: OrderTableProps) => {
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
            <OrderEntry key={order.id} order={order} onOrderClick={onOrderClick} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
