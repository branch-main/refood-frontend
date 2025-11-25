import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orderService, restaurantService, menuService } from "@/shared/services";
import { Order, OrderStatus, MenuItem } from "@/shared/types";
import { Modal } from "@/shared/components/ui/Modal";
import {
  formatPrice,
  formatDate,
  formatTimeFromDate,
  getRelativeTime,
  getFallbackImage,
} from "@/shared/utils";
import {
  getStatusIcon,
  getStatusText,
  getStatusColor,
} from "@/shared/utils/orderStatus";
import {
  FiX,
  FiClock,
  FiMapPin,
  FiPackage,
  FiEye,
} from "react-icons/fi";
import { GiCookingPot } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

type TabStatus = "NEW" | "PREPARING" | "WAITING" | "HISTORY";

const statusToTab: Record<OrderStatus, TabStatus> = {
  [OrderStatus.PENDING]: "NEW",
  [OrderStatus.CONFIRMED]: "NEW",
  [OrderStatus.PREPARING]: "PREPARING",
  [OrderStatus.DELIVERING]: "WAITING",
  [OrderStatus.COMPLETED]: "HISTORY",
  [OrderStatus.CANCELLED]: "HISTORY",
};

// Order Detail Modal Component
const OrderDetailModal = ({
  order,
  isOpen,
  onClose,
  onStartPreparation,
  onCancel,
  isLoading,
}: {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onStartPreparation: (orderId: string) => void;
  onCancel: (orderId: string) => void;
  isLoading: boolean;
}) => {
  const [menuItems, setMenuItems] = useState<Map<number, MenuItem>>(new Map());

  useEffect(() => {
    if (!order || !isOpen) return;

    const fetchMenuItems = async () => {
      const items = new Map<number, MenuItem>();
      for (const item of order.items) {
        try {
          const menuItem = await menuService.getMenuItem(item.menuItemId);
          items.set(item.menuItemId, menuItem);
        } catch (e) {
          // Item not found
        }
      }
      setMenuItems(items);
    };

    fetchMenuItems();
  }, [order, isOpen]);

  if (!order) return null;

  const canCancel =
    order.status !== OrderStatus.COMPLETED &&
    order.status !== OrderStatus.CANCELLED &&
    order.status !== OrderStatus.DELIVERING;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="w-[600px] max-w-[90vw] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-gray-900">
                Pedido #{order.id.slice(0, 8).toUpperCase()}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
              >
                {getStatusIcon(order.status)}
                {getStatusText(order.status)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {formatDate(order.createdAt)} • {formatTimeFromDate(order.createdAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <IoClose size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="p-6">
            {/* Delivery Address */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Dirección de entrega
              </h3>
              <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                <FiMapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700">{order.deliveryAddress}</span>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Productos ({order.items.length})
              </h3>
              <div className="space-y-3">
                {order.items.map((item, index) => {
                  const menuItem = menuItems.get(item.menuItemId);
                  const optionsTotal = item.options.reduce((sum, opt) => sum + opt.price, 0);
                  const itemTotalPrice = (item.price + optionsTotal) * item.quantity;
                  return (
                    <div
                      key={index}
                      className="flex gap-4 p-3 bg-gray-50 rounded-xl"
                    >
                      <img
                        src={getFallbackImage(
                          menuItem?.name || `Producto ${item.menuItemId}`,
                          menuItem?.image || null
                        )}
                        alt={menuItem?.name || "Producto"}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {menuItem?.name || `Producto #${item.menuItemId}`}
                            </h4>
                            {menuItem?.description && (
                              <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                                {menuItem.description}
                              </p>
                            )}
                          </div>
                          <span className="text-xs font-medium bg-gray-200 text-gray-700 px-2 py-1 rounded-full flex-shrink-0">
                            x{item.quantity}
                          </span>
                        </div>
                        {item.options.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {item.options.map((opt, i) => (
                              <span
                                key={i}
                                className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded"
                              >
                                {opt.name}: {opt.value}
                                {opt.price > 0 && ` (+${formatPrice(opt.price)})`}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-sm font-semibold text-gray-900 mt-2">
                          {formatPrice(itemTotalPrice)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex-shrink-0">
          {/* Totals */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-700">
                {formatPrice(order.totalPrice - order.deliveryFee)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery</span>
              <span className="text-gray-700">{formatPrice(order.deliveryFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">{formatPrice(order.totalPrice)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {canCancel && (
              <button
                onClick={() => {
                  onCancel(order.id);
                  onClose();
                }}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 text-red-600 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <FiX className="w-4 h-4" />
                Cancelar pedido
              </button>
            )}

            {order.status === OrderStatus.CONFIRMED && (
              <button
                onClick={() => {
                  onStartPreparation(order.id);
                  onClose();
                }}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-500 text-white rounded-xl font-medium text-sm hover:bg-purple-600 transition-colors disabled:opacity-50"
              >
                <GiCookingPot className="w-4 h-4" />
                Comenzar preparación
              </button>
            )}

            {order.status === OrderStatus.PREPARING && (
              <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-100 text-purple-700 rounded-xl font-medium text-sm">
                <GiCookingPot className="w-4 h-4 animate-pulse" />
                Preparando pedido...
              </div>
            )}

            {order.status === OrderStatus.DELIVERING && (
              <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-100 text-orange-700 rounded-xl font-medium text-sm">
                <FiClock className="w-4 h-4" />
                Esperando repartidor
              </div>
            )}

            {(order.status === OrderStatus.COMPLETED ||
              order.status === OrderStatus.CANCELLED) && (
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                Cerrar
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Order Card Component
const OrderCard = ({
  order,
  onViewDetails,
  onStartPreparation,
  onCancel,
  isLoading,
}: {
  order: Order;
  onViewDetails: (order: Order) => void;
  onStartPreparation: (orderId: string) => void;
  onCancel: (orderId: string) => void;
  isLoading: boolean;
}) => {
  const canCancel =
    order.status !== OrderStatus.COMPLETED &&
    order.status !== OrderStatus.CANCELLED &&
    order.status !== OrderStatus.DELIVERING;

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
              <div className="flex items-center gap-1.5 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                <GiCookingPot className="w-4 h-4 animate-pulse" />
                Preparando
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
    WAITING: {
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
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<TabStatus>("NEW");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Get owner's restaurants
  const { data: restaurants } = useQuery({
    queryKey: ["my-restaurants"],
    queryFn: () => restaurantService.getMyRestaurants(),
  });

  // Get orders for selected restaurant
  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["restaurant-orders", selectedRestaurant],
    queryFn: () =>
      selectedRestaurant
        ? orderService.getOrdersByRestaurant(selectedRestaurant)
        : Promise.resolve([]),
    enabled: !!selectedRestaurant,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Auto-select first restaurant
  useEffect(() => {
    if (restaurants && restaurants.length > 0 && !selectedRestaurant) {
      setSelectedRestaurant(restaurants[0].id);
    }
  }, [restaurants, selectedRestaurant]);

  // Mutations
  const confirmMutation = useMutation({
    mutationFn: orderService.confirmOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["restaurant-orders", selectedRestaurant],
      });
    },
  });

  const startPreparationMutation = useMutation({
    mutationFn: orderService.startPreparation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["restaurant-orders", selectedRestaurant],
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) =>
      orderService.cancelOrder(orderId, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["restaurant-orders", selectedRestaurant],
      });
    },
  });

  const handleStartPreparation = (orderId: string) => {
    startPreparationMutation.mutate(orderId);
  };

  const handleCancel = (orderId: string) => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas cancelar este pedido? Esta acción no se puede deshacer."
      )
    ) {
      cancelMutation.mutate({ orderId, reason: "Cancelado por el restaurante" });
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
    WAITING:
      orders?.filter((o) => o.status === OrderStatus.DELIVERING).length || 0,
    HISTORY:
      orders?.filter(
        (o) =>
          o.status === OrderStatus.COMPLETED ||
          o.status === OrderStatus.CANCELLED
      ).length || 0,
  };

  const tabs: { key: TabStatus; label: string; color: string }[] = [
    { key: "NEW", label: "Nuevos", color: "blue" },
    { key: "PREPARING", label: "En Preparación", color: "purple" },
    { key: "WAITING", label: "Esperando", color: "orange" },
    { key: "HISTORY", label: "Historial", color: "gray" },
  ];

  const isLoading =
    confirmMutation.isPending ||
    startPreparationMutation.isPending ||
    cancelMutation.isPending;

  return (
    <>
      <div className="flex justify-between items-center mb-7">
        <h1 className="text-2xl font-medium text-black">Pedidos</h1>
      </div>

      {/* Restaurant Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar Restaurante
        </label>
        <select
          value={selectedRestaurant || ""}
          onChange={(e) => setSelectedRestaurant(Number(e.target.value))}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          {restaurants && restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))
          ) : (
            <option value="">Sin restaurantes</option>
          )}
        </select>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-t-4xl shadow-[0_0_20px_rgba(0,0,0,0.02)] border-b border-gray-200">
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
      <div className="bg-white rounded-b-4xl shadow-[0_0_20px_rgba(0,0,0,0.02)] p-6">
        {ordersLoading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 mx-auto mb-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500">Cargando pedidos...</p>
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={handleViewDetails}
                onStartPreparation={handleStartPreparation}
                onCancel={handleCancel}
                isLoading={isLoading}
              />
            ))}
          </div>
        ) : (
          <EmptyState tab={activeTab} />
        )}
      </div>

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onStartPreparation={handleStartPreparation}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </>
  );
};
