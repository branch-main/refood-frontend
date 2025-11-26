import { useState } from "react";
import { useAuth, useOrdersByCustomer, useRestaurant } from "@/shared/hooks";
import { OrderStatus, Order as OrderType } from "@/shared/types";
import {
  formatPrice,
  getFallbackImage,
  getStatusIcon,
  getStatusText,
  getStatusColor,
  formatDate,
} from "@/shared/utils";
import { Link } from "react-router-dom";
import { Skeleton } from "@/shared/components/ui";
import { motion } from "framer-motion";

const getStatusHint = (status: OrderStatus): string => {
  switch (status) {
    case "PENDING":
      return "Tu pago está siendo procesado";
    case "CONFIRMED":
      return "El restaurante ha recibido tu pedido";
    case "PREPARING":
      return "El restaurante está preparando tu pedido";
    case "READY":
      return "Tu pedido está listo, esperando al repartidor";
    case "DELIVERING":
      return "El repartidor está en camino con tu pedido";
    case "COMPLETED":
      return "¡Tu pedido ha sido entregado!";
    case "CANCELLED":
      return "Este pedido ha sido cancelado";
    default:
      return "";
  }
};

const Order = ({ order, index }: { order: OrderType; index: number }) => {
  const { data: restaurant, isLoading } = useRestaurant(order.restaurantId);
  const quantity = order.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="mt-5 rounded-lg p-5 border border-gray-200"
    >
      {isLoading ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-11 w-11 rounded-full" />
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      ) : restaurant && (
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

          <div className="flex flex-col items-end gap-1">
            <span
              className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full ${getStatusColor(
                order.status,
              )}`}
            >
              {getStatusIcon(order.status)}
              {getStatusText(order.status)}
            </span>
            <span className="text-xs text-gray-500 italic">
              {getStatusHint(order.status)}
            </span>
          </div>
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
        {order.status !== OrderStatus.CANCELLED && (
          <Link
            to={`/profile/orders/${order.id}`}
            className="text-sm text-white bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Ver detalles
          </Link>
        )}

        {order.status !== OrderStatus.PENDING &&
          order.status !== OrderStatus.CANCELLED && (
            <Link
              to={`/profile/orders/${order.id}`}
              className="text-sm text-red-500 border border-red-500 px-5 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
            >
              Imprimir comprobante
            </Link>
          )}
      </div>
    </motion.div>
  );
};

const OrderSkeleton = () => (
  <div className="mt-5 rounded-lg p-5 border border-gray-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Skeleton className="h-11 w-11 rounded-full" />
        <Skeleton className="h-5 w-32" />
      </div>
      <Skeleton className="h-6 w-24 rounded-full" />
    </div>
    <div className="mt-4 grid grid-rows-2 grid-cols-2 gap-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-4 w-16" />
    </div>
    <div className="mt-4 flex items-center justify-between">
      <Skeleton className="h-5 w-20" />
      <Skeleton className="h-9 w-36 rounded-lg" />
    </div>
  </div>
);

const OrdersPageSkeleton = () => (
  <div className="p-6">
    <Skeleton className="h-10 w-64 mb-2" />
    <Skeleton className="h-4 w-96 mb-4" />
    <div className="border-b border-gray-200 mb-2" />
    {[1, 2, 3].map((i) => (
      <OrderSkeleton key={i} />
    ))}
  </div>
);

export const Orders = () => {
  const { user } = useAuth();
  const { data: orders, isLoading } = useOrdersByCustomer(user?.id);
  const [displayCount, setDisplayCount] = useState(10);

  if (isLoading) {
    return <OrdersPageSkeleton />;
  }

  if (!orders) {
    return <OrdersPageSkeleton />;
  }

  const visibleOrders = orders.slice(0, displayCount);
  const hasMore = displayCount < orders.length;

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 10);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6"
    >
      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-4xl font-bold"
      >
        ¡Mis últimos pedidos!
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mt-1 text-sm text-gray-500 border-b border-gray-200 pb-4"
      >
        Hazle seguimiento al detalle a tus pedidos anteriores y solicita ayuda
        si hay algún inconveniente con una de tus compras.
      </motion.p>

      {visibleOrders.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="mt-8 text-center py-12"
        >
          <h3 className="text-lg font-semibold mb-1">No tienes pedidos aún</h3>
          <p className="text-sm text-gray-500">
            Cuando realices tu primer pedido, aparecerá aquí
          </p>
        </motion.div>
      ) : (
        <>
          {visibleOrders.map((order, index) => (
            <Order key={order.id} order={order} index={index} />
          ))}

          {hasMore && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-8 flex justify-center"
            >
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 text-sm font-medium text-red-500 border-2 border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                Ver más pedidos
              </button>
            </motion.div>
          )}

          {!hasMore && orders.length > 10 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-8 text-center text-sm text-gray-500"
            >
              No hay más pedidos para mostrar
            </motion.div>
          )}
        </>
      )}
    </motion.div>
  );
};
