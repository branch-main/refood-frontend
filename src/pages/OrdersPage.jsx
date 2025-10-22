import { useState, useEffect } from 'react';
import { orderService } from '../services';
import { OrderCard } from '../components/orders/OrderCard';
import { Loading } from '../components/common';
import './OrdersPage.css';

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await orderService.getOrders();
      setOrders(data.results || data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action, orderId) => {
    try {
      if (action === 'cancel') {
        await orderService.cancelOrder(orderId);
        fetchOrders();
      }
    } catch (error) {
      console.error('Failed to perform action:', error);
      alert('Failed to perform action. Please try again.');
    }
  };

  return (
    <div className="orders-page">
      <div className="container">
        <div className="page-header">
          <h1>My Orders</h1>
          <p>Track your orders and pickup times</p>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="orders-list">
            {orders.length === 0 ? (
              <div className="empty-state">
                <p>You haven't placed any orders yet.</p>
                <a href="/listings" className="empty-link">
                  Browse listings to get started
                </a>
              </div>
            ) : (
              orders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order}
                  onAction={handleAction}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
