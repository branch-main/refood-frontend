import { useState, useEffect } from "react";
import { GetOrdersUseCase, CancelOrderUseCase } from "../../application/orders";
import { container } from "../../container";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { Order } from "../../domain/entities/Order";
import { OrderCard } from "../components/orders/OrderCard";
import { Loading } from "../components/common";

const getOrders = new GetOrdersUseCase(
  container.resolve<OrderRepository>("OrderRepository"),
);
const cancelOrder = new CancelOrderUseCase(
  container.resolve<OrderRepository>("OrderRepository"),
);

export const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders.execute();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action: string, orderId: number) => {
    try {
      if (action === "cancel") {
        await cancelOrder.execute(orderId);
        fetchOrders();
      }
    } catch (error) {
      console.error("Failed to perform action:", error);
      alert("Failed to perform action. Please try again.");
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Mis Pedidos</h1>
          <p className="text-gray-600">
            Rastrea tus pedidos y horarios de recogida
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-6 mt-8">
            {orders.length === 0 ? (
              <div className="text-center py-16 px-8 text-gray-500">
                <p>No has realizado ningún pedido todavía.</p>
                <a
                  href="/menu"
                  className="inline-block mt-4 text-[#B21F1F] font-semibold hover:underline"
                >
                  Explora alimentos para comenzar
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
