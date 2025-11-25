import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/shared/services";
import { Order, OrderStatus } from "@/shared/types";
import {
  getRelativeTime,
  formatPrice,
} from "@/shared/utils";
import {
  getStatusIcon,
  getStatusText,
  getStatusColor,
} from "@/shared/utils/orderStatus";
import {
  FiClock,
  FiMapPin,
  FiPackage,
  FiEye,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { HiChevronRight } from "react-icons/hi2";
import { GiCookingPot } from "react-icons/gi";
import { MdOutlineDoneAll } from "react-icons/md";
import { useRestaurantContext } from "../contexts";
import { OrderDetailModal } from "../features/orders/components/OrderDetailModal";
import { ConfirmModal } from "../components/ConfirmModal";

type TabStatus = "NEW" | "PREPARING" | "READY" | "HISTORY";

const statusToTab: Record<OrderStatus, TabStatus> = {
  [OrderStatus.PENDING]: "NEW",
  [OrderStatus.CONFIRMED]: "NEW",
  [OrderStatus.PREPARING]: "PREPARING",
  [OrderStatus.READY]: "READY",
  [OrderStatus.DELIVERING]: "HISTORY",
  [OrderStatus.COMPLETED]: "HISTORY",
  [OrderStatus.CANCELLED]: "HISTORY",
};

// Order Card Component
const OrderCard = ({
  order,
  onViewDetails,
  onStartPreparation,
  onMarkReady,
  onCancel,
  isLoading,
}: {
  order: Order;
  onViewDetails: (order: Order) => void;
  onStartPreparation: (orderId: string) => void;
  onMarkReady: (orderId: string) => void;
  onCancel: (orderId: string) => void;
  isLoading: boolean;
}) => {
  const canCancel =
    order.status !== OrderStatus.COMPLETED &&
    order.status !== OrderStatus.CANCELLED &&
    order.status !== OrderStatus.DELIVERING &&
    order.status !== OrderStatus.READY;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <span className="text-sm font-mono text-gray-500">
              #{order.id.slice(0, 8).toUpperCase()}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
            >
              {getStatusIcon(order.status)}
              {getStatusText(order.status)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiClock className="w-4 h-4" />
            {getRelativeTime(order.createdAt)}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiMapPin className="w-4 h-4 text-gray-400" />
          <span className="line-clamp-1">{order.deliveryAddress}</span>
        </div>
      </div>

      {/* Items Summary */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiPackage className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              {order.items.length} producto{order.items.length > 1 ? "s" : ""}
            </span>
          </div>
          <button
            onClick={() => onViewDetails(order)}
            className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            <FiEye className="w-4 h-4" />
            Ver detalle
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">Total</span>
            <p className="text-lg font-bold text-gray-900">
              {formatPrice(order.totalPrice)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {canCancel && (
              <button
                onClick={() => onCancel(order.id)}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <FiX className="w-4 h-4" />
                Cancelar
              </button>
            )}

            {order.status === OrderStatus.CONFIRMED && (
              <button
                onClick={() => onStartPreparation(order.id)}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors disabled:opacity-50"
              >
                <GiCookingPot className="w-4 h-4" />
                Preparar
              </button>
            )}

            {order.status === OrderStatus.PREPARING && (
              <button
                onClick={() => onMarkReady(order.id)}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors disabled:opacity-50"
              >
                <MdOutlineDoneAll className="w-4 h-4" />
                Listo
              </button>
            )}

            {order.status === OrderStatus.READY && (
              <div className="flex items-center gap-1.5 px-3 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">
                <FiClock className="w-4 h-4" />
                Esperando
              </div>
            )}

            {order.status === OrderStatus.DELIVERING && (
              <div className="flex items-center gap-1.5 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                <FiClock className="w-4 h-4" />
                En camino
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Skeleton for order cards
const OrderCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
    <div className="p-4 border-b border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-6 w-24 bg-gray-200 rounded-full" />
        </div>
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>
      <div className="h-4 w-48 bg-gray-200 rounded" />
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </div>
    </div>
    <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-3 w-10 bg-gray-200 rounded mb-1" />
          <div className="h-6 w-20 bg-gray-200 rounded" />
        </div>
        <div className="h-9 w-24 bg-gray-200 rounded-lg" />
      </div>
    </div>
  </div>
);

const EmptyState = ({ tab }: { tab: TabStatus }) => {
  const messages: Record<TabStatus, { title: string; subtitle: string }> = {
    NEW: {
      title: "No hay pedidos nuevos",
      subtitle: "Los nuevos pedidos aparecerán aquí",
    },
    PREPARING: {
      title: "No hay pedidos en preparación",
      subtitle: "Los pedidos que estés preparando aparecerán aquí",
    },
    READY: {
      title: "No hay pedidos listos",
      subtitle: "Los pedidos esperando repartidor aparecerán aquí",
    },
    HISTORY: {
      title: "No hay historial de pedidos",
      subtitle: "Los pedidos completados y cancelados aparecerán aquí",
    },
  };

  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <FiPackage className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        {messages[tab].title}
      </h3>
      <p className="text-sm text-gray-500">{messages[tab].subtitle}</p>
    </div>
  );
};

export const PartnerOrders = () => {
  const queryClient = useQueryClient();
  const { selectedRestaurant, selectedRestaurantId } = useRestaurantContext();
  const [activeTab, setActiveTab] = useState<TabStatus>("NEW");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);

  // Get orders for selected restaurant
  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["restaurant-orders", selectedRestaurantId],
    queryFn: () =>
      selectedRestaurantId
        ? orderService.getOrdersByRestaurant(selectedRestaurantId)
        : Promise.resolve([]),
    enabled: !!selectedRestaurantId,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Mutations
  const confirmMutation = useMutation({
    mutationFn: orderService.confirmOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["restaurant-orders", selectedRestaurantId],
      });
    },
  });

  const startPreparationMutation = useMutation({
    mutationFn: orderService.startPreparation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["restaurant-orders", selectedRestaurantId],
      });
    },
  });

  const markReadyMutation = useMutation({
    mutationFn: orderService.markReady,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["restaurant-orders", selectedRestaurantId],
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) =>
      orderService.cancelOrder(orderId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["restaurant-orders", selectedRestaurantId],
      });
    },
  });

  const handleStartPreparation = (orderId: string) => {
    startPreparationMutation.mutate(orderId);
  };

  const handleMarkReady = (orderId: string) => {
    markReadyMutation.mutate(orderId);
  };

  const handleCancel = (orderId: string) => {
    setCancelOrderId(orderId);
  };

  const confirmCancel = () => {
    if (cancelOrderId) {
      cancelMutation.mutate({ orderId: cancelOrderId, reason: "Cancelado por el restaurante" });
      setCancelOrderId(null);
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  // Filter orders by tab
  const filteredOrders =
    orders?.filter((order) => statusToTab[order.status] === activeTab) || [];

  // Count orders per tab
  const orderCounts: Record<TabStatus, number> = {
    NEW:
      orders?.filter(
        (o) =>
          o.status === OrderStatus.PENDING || o.status === OrderStatus.CONFIRMED
      ).length || 0,
    PREPARING:
      orders?.filter((o) => o.status === OrderStatus.PREPARING).length || 0,
    READY:
      orders?.filter((o) => o.status === OrderStatus.READY).length || 0,
    HISTORY:
      orders?.filter(
        (o) =>
          o.status === OrderStatus.COMPLETED ||
          o.status === OrderStatus.CANCELLED ||
          o.status === OrderStatus.DELIVERING
      ).length || 0,
  };

  const tabs: { key: TabStatus; label: string; color: string }[] = [
    { key: "NEW", label: "Nuevos", color: "blue" },
    { key: "PREPARING", label: "En Preparación", color: "purple" },
    { key: "READY", label: "Listos", color: "orange" },
    { key: "HISTORY", label: "Historial", color: "gray" },
  ];

  const isLoading =
    confirmMutation.isPending ||
    startPreparationMutation.isPending ||
    markReadyMutation.isPending ||
    cancelMutation.isPending;

  if (!selectedRestaurant) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] text-center">
        <p className="text-gray-500">Selecciona un restaurante en el menú lateral para ver los pedidos.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <div className="flex items-center gap-2">
          <span className="text-2xl leading-none text-gray-500">{selectedRestaurant.name}</span>
          <HiChevronRight className="w-5 h-5 text-gray-400" />
          <h1 className="text-2xl leading-none font-bold text-gray-800">Pedidos</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-t-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] border-b border-gray-100">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all relative ${
                activeTab === tab.key
                  ? "text-red-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {tab.label}
                {orderCounts[tab.key] > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === tab.key
                        ? "bg-red-100 text-red-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {orderCounts[tab.key]}
                  </span>
                )}
              </div>
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-b-2xl shadow-[0px_0px_25px_2px_rgba(0,0,0,0.025)] p-6">
        {ordersLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <OrderCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <OrderCard
                  order={order}
                  onViewDetails={handleViewDetails}
                  onStartPreparation={handleStartPreparation}
                  onMarkReady={handleMarkReady}
                  onCancel={handleCancel}
                  isLoading={isLoading}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <EmptyState tab={activeTab} />
          </motion.div>
        )}
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onStartPreparation={handleStartPreparation}
        onMarkReady={handleMarkReady}
        onCancel={handleCancel}
        isLoading={isLoading}
      />

      {/* Cancel Order Confirmation Modal */}
      <ConfirmModal
        isOpen={!!cancelOrderId}
        onClose={() => setCancelOrderId(null)}
        onConfirm={confirmCancel}
        title="Cancelar Pedido"
        message="¿Estás seguro de que deseas cancelar este pedido? Esta acción no se puede deshacer y el cliente será notificado."
        confirmText="Cancelar Pedido"
        cancelText="Volver"
        variant="danger"
        isLoading={cancelMutation.isPending}
      />
    </>
  );
};
