import {
  useMenuItem,
  useOrder,
  usePaymentByOrder,
  useRestaurant,
} from "@/shared/hooks";
import { OrderItem as OrderItemType, OrderStatus } from "@/shared/types";
import { PaymentMethod } from "@/shared/services";
import { getFallbackImage, formatPrice } from "@/shared/utils";
import { BsStripe, BsPaypal } from "react-icons/bs";
import { FiClock, FiCheck, FiTruck, FiPackage } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { TiArrowLeftOutline } from "react-icons/ti";
import { SlArrowLeft } from "react-icons/sl";

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return <FiClock className="w-4 h-4" />;
    case OrderStatus.CONFIRMED:
      return <FiCheck className="w-4 h-4" />;
    case OrderStatus.DELIVERYING:
      return <FiTruck className="w-4 h-4" />;
    case OrderStatus.COMPLETED:
      return <FiPackage className="w-4 h-4" />;
    default:
      return null;
  }
};

const getStatusText = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PENDING:
      return "Pendiente";
    case OrderStatus.CONFIRMED:
      return "Confirmado";
    case OrderStatus.DELIVERYING:
      return "En camino";
    case OrderStatus.COMPLETED:
      return "Completado";
    default:
      return status;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case OrderStatus.PENDING:
      return "bg-yellow-50 text-yellow-400";
    case OrderStatus.CONFIRMED:
      return "bg-blue-50 text-blue-400";
    case OrderStatus.DELIVERYING:
      return "bg-orange-50 text-orange-400";
    case OrderStatus.COMPLETED:
      return "bg-green-50 text-green-400";
  }
};

const getPaymentMethodIcon = (method: PaymentMethod) => {
  switch (method) {
    case "STRIPE":
      return <BsStripe size={20} className="fill-[#6358f7]" />;
    case "PAYPAL":
      return <BsPaypal size={20} className="fill-blue-900" />;
    case "YAPE":
      return <span className="font-bold">Y</span>;
  }
};

const getPamentMethodText = (method: PaymentMethod) => {
  switch (method) {
    case "STRIPE":
      return "Stripe";
    case "PAYPAL":
      return "PayPal";
    case "YAPE":
      return "Yape";
  }
};

const OrderItem = ({ item }: { item: OrderItemType }) => {
  const { data: menuItem } = useMenuItem(item.menuItemId);

  if (!menuItem) {
    return null;
  }

  return (
    <div className="flex gap-4">
      <img
        alt={menuItem.name}
        src={getFallbackImage(menuItem.name, menuItem.image)}
        className="h-16 w-16 object-cover"
      />

      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-800">{menuItem.name}</h4>
        <p className="text-sm text-gray-500">{menuItem.description}</p>
      </div>

      <div className="text-center">
        <p className="text-xs text-gray-600">
          {item.quantity === 1 ? "1 Unidad" : `${item.quantity} Unidades`}
        </p>
        <p className="text-sm font-bold text-gray-800">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
};

export const Order = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const { data: order } = useOrder(orderId);
  const { data: payment } = usePaymentByOrder(order?.id);
  const { data: restaurant } = useRestaurant(order?.restaurantId);

  if (!order || !restaurant || !payment) return null;

  const productsTotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const total = productsTotal + order.deliveryFee;

  return (
    <>
      <div className="p-6 border-b border-gray-200 flex items-center gap-5">
        <SlArrowLeft
          className="w-5 h-5 cursor-pointer"
          onClick={() => navigate("/profile/orders")}
        />
        <span className="text-gray-800 font-bold">Resumen</span>
      </div>

      <div className="px-24 py-12 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 px-5">
          <div className="flex flex-col">
            <span className="text-gray-800 font-bold text-xl">
              {restaurant.name}
            </span>
            <span className="text-gray-800 text-sm">{restaurant.address}</span>
          </div>
          <span
            className={`flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full ${getStatusColor(order.status)}`}
          >
            {getStatusIcon(order.status)}
            {getStatusText(order.status)}
          </span>
        </div>

        <div className="flex flex-col border-b border-gray-200 pb-4 px-5">
          <span className="text-gray-800 text-lg font-bold">Inicio</span>
          <span className="text-gray-800 text-sm">{order.createdAt}</span>
          <span className="text-gray-800 text-sm">21:00</span>
        </div>

        <div className="flex flex-col border-b border-gray-200 pb-4 px-5">
          <span className="text-gray-800 text-lg font-bold">Entrega</span>
          <span className="text-gray-800 text-sm">{order.createdAt}</span>
          <span className="text-gray-800 text-sm">21:00</span>
          <span className="text-gray-800 text-sm mt-4">
            {order.deliveryAddress}
          </span>
        </div>

        <div className="flex flex-col border-b border-gray-200 pb-4 px-5">
          <span className="text-gray-800 text-lg font-bold">Resumen</span>
          <div className="space-y-4 my-4">
            {order.items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </div>
        </div>

        <div className="flex flex-col border-b border-gray-200 pb-4 px-5">
          <span className="text-gray-800 text-lg font-bold mb-2">
            Método de pago
          </span>
          <span className="w-max flex items-center gap-3 text-gray-800 text-sm bg-neutral-50 px-3 py-2 rounded-lg">
            {getPaymentMethodIcon(payment.method)}
            {getPamentMethodText(payment.method)}
          </span>
        </div>

        <div className="flex flex-col px-5">
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
        </div>
      </div>
    </>
  );
};
