import { Card } from '../common';
import { formatPrice, formatDateTime } from '../../utils';
import './OrderCard.css';

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

  return (
    <Card>
      <div className="order-card">
        <div className="order-header">
          <div>
            <h3 className="order-number">Order #{order.order_number}</h3>
            <p className="order-date">{formatDateTime(order.created_at)}</p>
          </div>
          <span className={`order-status status-${getStatusColor(order.status)}`}>
            {order.status}
          </span>
        </div>

        <div className="order-restaurant">
          <strong>{order.restaurant_info?.business_name}</strong>
        </div>

        <div className="order-items">
          {order.items?.map((item, idx) => (
            <div key={idx} className="order-item">
              <span>{item.listing_info?.title}</span>
              <span>x{item.quantity}</span>
              <span>{formatPrice(item.subtotal)}</span>
            </div>
          ))}
        </div>

        <div className="order-footer">
          <div className="order-total">
            <span>Total:</span>
            <strong>{formatPrice(order.total)}</strong>
          </div>

          {order.pickup_time && (
            <div className="order-pickup">
              <span>Pickup: {formatDateTime(order.pickup_time)}</span>
            </div>
          )}
        </div>

        {order.status === 'pending' && onAction && (
          <div className="order-actions">
            <button 
              onClick={() => onAction('cancel', order.id)}
              className="order-action-cancel"
            >
              Cancel Order
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};
