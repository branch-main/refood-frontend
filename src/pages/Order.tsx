import {
  useMenuItem,
  useOrder,
  usePaymentByOrder,
  useRestaurant,
} from "@/shared/hooks";
import { OrderItem as OrderItemType, OrderStatus } from "@/shared/types";
import {
  getFallbackImage,
  formatPrice,
  getStatusIcon,
  getStatusText,
  getStatusColor,
  getPaymentMethodIcon,
  getPaymentMethodText,
  formatDate,
  formatTimeFromDate,
} from "@/shared/utils";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { Skeleton } from "@/shared/components/ui";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

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

const OrderItem = ({ item }: { item: OrderItemType }) => {
  const { data: menuItem, isLoading } = useMenuItem(item.menuItemId);

  if (isLoading || !menuItem) {
    return (
      <div className="flex gap-4">
        <Skeleton className="h-16 w-16 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
        <div className="text-center space-y-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    );
  }

  // Calculate total price including options
  const optionsTotal = item.options.reduce((sum, option) => sum + option.price, 0);
  const itemTotalPrice = (item.price + optionsTotal) * item.quantity;

  return (
    <div className="flex gap-4">
      <img
        alt={menuItem.name}
        src={getFallbackImage(menuItem.name, menuItem.image)}
        className="h-16 w-16 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-800">{menuItem.name}</h4>
        <p className="text-sm text-gray-500">{menuItem.description}</p>
        
        {/* Show selected options */}
        {item.options.length > 0 && (
          <div className="mt-1 space-y-0.5">
            {item.options.map((option, index) => (
              <p key={index} className="text-xs text-gray-600">
                • {option.name}: {option.value} 
                {option.price > 0 && ` (+${formatPrice(option.price)})`}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-600">
          {item.quantity === 1 ? "1 Unidad" : `${item.quantity} Unidades`}
        </p>
        <p className="text-sm font-bold text-gray-800">
          {formatPrice(itemTotalPrice)}
        </p>
      </div>
    </div>
  );
};

const OrderSkeleton = () => (
  <>
    <div className="p-6 border-b border-gray-200 flex items-center gap-5">
      <Skeleton className="w-5 h-5" />
      <Skeleton className="h-5 w-20" />
    </div>
    <div className="px-24 py-12 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-5">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-3 w-40" />
        </div>
      </div>
      <div className="flex flex-col border-b border-gray-200 pb-4 px-5 gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex flex-col border-b border-gray-200 pb-4 px-5 gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex flex-col border-b border-gray-200 pb-4 px-5 gap-2">
        <Skeleton className="h-5 w-20" />
        <div className="space-y-4 my-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-16 w-16 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col px-5 gap-2">
        <Skeleton className="h-5 w-16" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  </>
);

export const Order = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  const shouldPrint = searchParams.get("print") === "true";

  const { data: order, isLoading: orderLoading } = useOrder(orderId);
  const { data: payment, isLoading: paymentLoading } = usePaymentByOrder(order?.id);
  const { data: restaurant, isLoading: restaurantLoading } = useRestaurant(order?.restaurantId);

  const isLoading = orderLoading || paymentLoading || restaurantLoading;

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (shouldPrint && !isLoading && order && restaurant && payment) {
      setTimeout(() => {
        window.print();
      }, 500);
    }
  }, [shouldPrint, isLoading, order, restaurant, payment]);

  if (isLoading || !order || !restaurant || !payment) {
    return <OrderSkeleton />;
  }

  // Calculate products total including options
  const productsTotal = order.items.reduce((total, item) => {
    const optionsTotal = item.options.reduce((sum, option) => sum + option.price, 0);
    return total + (item.price + optionsTotal) * item.quantity;
  }, 0);

  const total = productsTotal + order.deliveryFee;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Print styles */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              padding: 20px;
            }
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      <div className="p-6 border-b border-gray-200 flex items-center justify-between no-print">
        <div className="flex items-center gap-5">
          <SlArrowLeft
            className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors"
            onClick={() => navigate("/profile/orders")}
          />
          <span className="text-gray-800 font-bold">Resumen</span>
        </div>
        {order.status !== OrderStatus.PENDING && order.status !== OrderStatus.CANCELLED && (
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 text-sm text-red-500 border border-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir comprobante
          </button>
        )}
      </div>

      <div ref={printRef} className="print-area px-24 py-12 flex flex-col gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center justify-between border-b border-gray-200 pb-4 px-5"
        >
          <div className="flex flex-col">
            <span className="text-gray-800 font-bold text-xl">
              {restaurant.name}
            </span>
            <span className="text-gray-800 text-sm">{restaurant.address}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span
              className={`flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full ${getStatusColor(order.status)}`}
            >
              {getStatusIcon(order.status)}
              {getStatusText(order.status)}
            </span>
            <span className="text-xs text-gray-500 italic">
              {getStatusHint(order.status)}
            </span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="flex flex-col border-b border-gray-200 pb-4 px-5"
        >
          <span className="text-gray-800 text-lg font-bold">Inicio</span>
          <span className="text-gray-800 text-sm">
            {formatDate(order.createdAt)}
          </span>
          <span className="text-gray-800 text-sm">
            {formatTimeFromDate(order.createdAt)}
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex flex-col border-b border-gray-200 pb-4 px-5"
        >
          <span className="text-gray-800 text-lg font-bold">Entrega</span>
          {order.deliveredAt ? (
            <>
              <span className="text-gray-800 text-sm">
                {formatDate(order.deliveredAt)}
              </span>
              <span className="text-gray-800 text-sm">
                {formatTimeFromDate(order.deliveredAt)}
              </span>
            </>
          ) : (
            <span className="text-gray-500 text-sm">Pendiente</span>
          )}
          <span className="text-gray-800 text-sm mt-4">
            {order.deliveryAddress}
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="flex flex-col border-b border-gray-200 pb-4 px-5"
        >
          <span className="text-gray-800 text-lg font-bold">Resumen</span>
          <div className="space-y-4 my-4">
            {order.items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-col border-b border-gray-200 pb-4 px-5"
        >
          <span className="text-gray-800 text-lg font-bold mb-2">
            Método de pago
          </span>
          <span className="w-max flex items-center gap-3 text-gray-800 text-sm bg-neutral-50 px-3 py-2 rounded-lg">
            {getPaymentMethodIcon(payment.method)}
            {getPaymentMethodText(payment.method)}
          </span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="flex flex-col px-5"
        >
          <span className="text-gray-800 text-lg font-bold pb-4">Costos</span>
          <div className="flex flex-col gap-2">
            <div className="text-gray-800 text-sm flex justify-between">
              <span>Total productos</span>
              <span>{formatPrice(productsTotal)}</span>
            </div>
            <div className="text-gray-800 text-sm flex justify-between">
              <span>Total cargos</span>
              <span>{formatPrice(order.deliveryFee)}</span>
            </div>
            <div className="text-gray-800 font-bold text-sm flex justify-between">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
