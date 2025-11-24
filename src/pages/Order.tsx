import {
  useMenuItem,
  useOrder,
  usePaymentByOrder,
  useRestaurant,
} from "@/shared/hooks";
import { OrderItem as OrderItemType } from "@/shared/types";
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
import { useNavigate, useParams } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";

const OrderItem = ({ item }: { item: OrderItemType }) => {
  const { data: menuItem } = useMenuItem(item.menuItemId);

  if (!menuItem) {
    return null;
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

export const Order = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const { data: order } = useOrder(orderId);
  const { data: payment } = usePaymentByOrder(order?.id);
  const { data: restaurant } = useRestaurant(order?.restaurantId);

  if (!order || !restaurant || !payment) return null;

  // Calculate products total including options
  const productsTotal = order.items.reduce((total, item) => {
    const optionsTotal = item.options.reduce((sum, option) => sum + option.price, 0);
    return total + (item.price + optionsTotal) * item.quantity;
  }, 0);

  const total = productsTotal + order.deliveryFee;

  console.log(order);

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
          <span className="text-gray-800 text-sm">
            {formatDate(order.createdAt)}
          </span>
          <span className="text-gray-800 text-sm">
            {formatTimeFromDate(order.createdAt)}
          </span>
        </div>

        <div className="flex flex-col border-b border-gray-200 pb-4 px-5">
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
            {getPaymentMethodText(payment.method)}
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
