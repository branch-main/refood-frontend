import { Card, Button } from '../common';
import { formatPrice, formatDateTime } from '../../../shared/utils';

interface OrderItem {
  listing_info?: {
    title: string;
  };
  quantity: number;
  subtotal: number;
}

interface RestaurantInfo {
  business_name: string;
}

interface Order {
  id: number;
  order_number: string;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  created_at: string;
  restaurant_info?: RestaurantInfo;
  items?: OrderItem[];
  total: number;
  pickup_time?: string;
}

interface OrderCardProps {
  order: Order;
  onAction?: (action: string, orderId: number) => void;
}

export const OrderCard = ({ order, onAction }: OrderCardProps) => {
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'orange',
      confirmed: 'blue',
      ready: 'purple',
      completed: 'green',
      cancelled: 'red'
    };
    return colors[status] || 'gray';
  };

  const statusClasses: Record<string, string> = {
    orange: 'bg-amber-100 text-amber-900',
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    green: 'bg-emerald-100 text-emerald-800',
    red: 'bg-red-100 text-red-800'
  };

  const statusColor = getStatusColor(order.status);

  const getStatusLabel = (status: string): string => {
    const labels: Record<string, string> = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      ready: 'Listo',
      completed: 'Completado',
      cancelled: 'Cancelado'
    };
    return labels[status] || status;
  };

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start pb-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-bold m-0 text-gray-900">
              Pedido #{order.order_number}
            </h3>
            <p className="text-sm text-gray-500 mt-1 m-0">
              {formatDateTime(order.created_at)}
            </p>
          </div>
          <span
            className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase ${statusClasses[statusColor]}`}
          >
            {getStatusLabel(order.status)}
          </span>
        </div>

        <div className="text-base text-gray-700">
          <strong>{order.restaurant_info?.business_name}</strong>
        </div>

        <div className="flex flex-col gap-2">
          {order.items?.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[1fr_auto_auto] gap-4 p-2 bg-gray-50 rounded-md text-sm"
            >
              <span>{item.listing_info?.title}</span>
              <span>x{item.quantity}</span>
              <span>{formatPrice(item.subtotal)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-lg">
            <span>Total:</span>
            <strong className="text-[#B21F1F] text-2xl">
              {formatPrice(order.total)}
            </strong>
          </div>

          {order.pickup_time && (
            <div className="text-sm text-gray-500">
              <span>Recogida: {formatDateTime(order.pickup_time)}</span>
            </div>
          )}
        </div>

        {order.status === 'pending' && onAction && (
          <div className="flex gap-2">
            <Button
              onClick={() => onAction('cancel', order.id)}
              variant="outline"
              size="small"
            >
              Cancelar Pedido
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
