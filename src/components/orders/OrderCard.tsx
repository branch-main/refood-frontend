import { Card } from '../common';
import { formatPrice, formatDateTime } from '../../utils';

export const OrderCard = ({ order, onAction }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'orange',
      confirmed: 'blue',
      ready: 'purple',
      completed: 'green',
      cancelled: 'red'
    };
    return colors[status] || 'gray';
  };

  const statusClasses = {
    orange: 'bg-amber-100 text-amber-900',
    blue: 'bg-blue-100 text-blue-800',
    purple: 'bg-purple-100 text-purple-800',
    green: 'bg-emerald-100 text-emerald-800',
    red: 'bg-red-100 text-red-800'
  };

  const statusColor = getStatusColor(order.status);

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start pb-4 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-bold m-0 text-gray-900">Pedido #{order.order_number}</h3>
            <p className="text-sm text-gray-500 mt-1 m-0">{formatDateTime(order.created_at)}</p>
          </div>
          <span className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase ${statusClasses[statusColor]}`}>
            {order.status === 'pending' ? 'Pendiente' : 
             order.status === 'confirmed' ? 'Confirmado' :
             order.status === 'ready' ? 'Listo' :
             order.status === 'completed' ? 'Completado' : 'Cancelado'}
          </span>
        </div>

        <div className="text-base text-gray-700">
          <strong>{order.restaurant_info?.business_name}</strong>
        </div>

        <div className="flex flex-col gap-2">
          {order.items?.map((item, idx) => (
            <div key={idx} className="grid grid-cols-[1fr_auto_auto] gap-4 p-2 bg-gray-50 rounded-md text-sm">
              <span>{item.listing_info?.title}</span>
              <span>x{item.quantity}</span>
              <span>{formatPrice(item.subtotal)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-lg">
            <span>Total:</span>
            <strong className="text-[#B21F1F] text-2xl">{formatPrice(order.total)}</strong>
          </div>

          {order.pickup_time && (
            <div className="text-sm text-gray-500">
              <span>Recogida: {formatDateTime(order.pickup_time)}</span>
            </div>
          )}
        </div>

        {order.status === 'pending' && onAction && (
          <div className="flex gap-2">
            <button 
              onClick={() => onAction('cancel', order.id)}
              className="px-4 py-2 bg-transparent border border-red-500 text-red-500 rounded-md font-semibold cursor-pointer transition-all duration-200 hover:bg-red-500 hover:text-white"
            >
              Cancelar Pedido
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};
