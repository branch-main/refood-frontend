import { CartItem, useCart } from "@/features/cart/contexts";
import { useAuth, useMenuItem, useRestaurant } from "@/shared/hooks";
import {
  calculateDiscount,
  formatPrice,
  getFallbackImage,
  getPaymentMethodIcon,
  getPaymentMethodText,
} from "@/shared/utils";
import { orderService } from "@/shared/services/orderService";
import {
  paymentService,
  PaymentMethod,
} from "@/shared/services/paymentService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutAddress = () => {
  return (
    <div className="bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.03)] p-4 flex flex-col gap-4">
      <span className="text-gray-800 font-bold text-lg border-b border-gray-200 pb-4">
        Dirección de entrega
      </span>
      <span className="text-gray-800 font-bold">
        Residencia Militar - EP, Jiron Simon Bolivar 119, Trujillo 13001, Peru
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-800">
          Instrucciones de entrega (opcional)
        </span>
        <input
          className="tracking-wide bg-gray-50 text-xs text-gray-800 px-2 py-4 focus:outline-none border-b border-gray-200 focus:border-green-400 caret-green-400 transition-colors"
          placeholder="Detalles adicionales..."
        />
      </div>
    </div>
  );
};

const CheckoutItem = ({ item }: { item: CartItem }) => {
  const { data: menuItem } = useMenuItem(item.id);
  if (!menuItem) {
    return null;
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg flex gap-4">
      <span className="my-auto text-gray-800 text-sm">x{item.quantity}</span>

      <img
        alt={menuItem.name}
        src={getFallbackImage(menuItem.name, menuItem.image)}
        className="h-22 aspect-square rounded-lg object-cover"
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          {item.discountPrice && (
            <span className="bg-red-100 text-red-500 text-xs font-bold rounded-md px-1.5 py-px">
              -{calculateDiscount(item.price, item.discountPrice)}%
            </span>
          )}
          <span className="text-gray-800 font-bold text-sm line-clamp-1">
            {menuItem.name}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          {item.discountPrice ? (
            <>
              <span className="text-gray-800 font-bold text-sm">
                {formatPrice(item.discountPrice + item.additionalPrice)}
              </span>
              <span className="text-gray-500 line-through text-sm">
                {formatPrice(item.price + item.additionalPrice)}
              </span>
            </>
          ) : (
            <span className="text-gray-800 font-bold text-sm">
              {formatPrice(item.price + item.additionalPrice)}
            </span>
          )}
        </div>
        <span className="text-gray-500 text-xs line-clamp-2">
          {menuItem.description}
        </span>
      </div>
    </div>
  );
};

const CheckoutItemList = () => {
  const { restaurantId: restaurantId, items } = useCart();
  const { data: restaurant } = useRestaurant(restaurantId!);

  return (
    <div className="bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.03)] p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-gray-200 pb-4">
        {restaurant && (
          <div className="inline-flex gap-4 items-center">
            <img
              alt={restaurant.name}
              src={getFallbackImage(restaurant.name, restaurant.logo)}
              className="w-9 aspect-square rounded-full object-cover"
            />
            <span className="text-gray-800 font-bold text-lg">
              {restaurant?.name}
            </span>
          </div>
        )}
        <span className="text-gray-500 text-sm">1 producto</span>
      </div>

      {items && items.map((item) => <CheckoutItem key={item.id} item={item} />)}

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <span className="text-gray-800">Entrega estimada</span>
        <span className="text-gray-800 font-bold">
          {restaurant?.minPreparationTime} - {restaurant?.maxPreparationTime}{" "}
          min
        </span>
      </div>
    </div>
  );
};

const CheckoutPaymentMethods = ({
  selected,
  setSelected,
}: {
  selected: PaymentMethod;
  setSelected: (method: PaymentMethod) => void;
}) => {
  return (
    <div className="bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.03)] p-4 flex flex-col gap-4">
      <span className="text-gray-800 font-bold text-lg border-b border-gray-200 pb-4">
        Método de pago
      </span>

      <div className="flex flex-col gap-2">
        <label
          className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${selected === "STRIPE" ? "border-green-400 bg-green-50" : "border-gray-200"}`}
        >
          <input
            type="radio"
            name="payment"
            value="STRIPE"
            checked={selected === "STRIPE"}
            onChange={(e) => setSelected(e.target.value as PaymentMethod)}
            className="w-4 h-4 text-green-400"
          />
          <span className="text-gray-800 font-medium flex items-center gap-2">
            {getPaymentMethodIcon("STRIPE")}
            {getPaymentMethodText("STRIPE")}
          </span>
        </label>

        <label
          className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${selected === "PAYPAL" ? "border-green-400 bg-green-50" : "border-gray-200"}`}
        >
          <input
            type="radio"
            name="payment"
            value="PAYPAL"
            checked={selected === "PAYPAL"}
            onChange={(e) => setSelected(e.target.value as PaymentMethod)}
            className="w-4 h-4"
          />
          <span className="text-gray-800 font-medium flex items-center gap-2">
            {getPaymentMethodIcon("PAYPAL")}
            {getPaymentMethodText("PAYPAL")}
          </span>
        </label>
      </div>
    </div>
  );
};

const CheckoutSummary = () => {
  const { subtotal, total } = useCart();
  const deliveryFee = 2.5;

  return (
    <div className="p-4 bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.03)] space-y-4 border-gray-200">
      <h1 className="text-lg text-gray-800 font-bold border-b border-gray-200 pb-4">
        Resumen
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <span className="text-gray-700 text-sm">Subtotal</span>
          <span className="text-gray-700 text-sm">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700 text-sm">Envío</span>
          <span className="text-gray-700 text-sm">
            {formatPrice(deliveryFee)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-800 font-bold">Total</span>
          <span className="text-gray-800 font-bold">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
};

const CheckoutError = ({ message }: { message: string | null }) => {
  return (
    message && (
      <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
        <strong>Error:</strong> {message}
      </div>
    )
  );
};

const CheckoutProceedButton = ({
  onCheckout,
  isProcessing,
}: {
  onCheckout: () => void;
  isProcessing: boolean;
}) => {
  return (
    <button
      onClick={onCheckout}
      disabled={isProcessing}
      className="bg-green-400 text-white text-sm font-bold px-6 py-3 rounded-lg hover:bg-green-500 transition w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      {isProcessing ? (
        <span className="flex items-center justify-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Procesando...
        </span>
      ) : (
        "Hacer pedido"
      )}
    </button>
  );
};

export const Checkout = () => {
  const { restaurantId, items } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("STRIPE");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      navigate("/restaurants");
    }
  }, [items, navigate]);

  const handleCheckout = async () => {
    if (!user || !restaurantId || items.length === 0) {
      setError("Missing required information");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const order = await orderService.createOrder({
        customerId: user.id,
        restaurantId: restaurantId,
        deliveryAddress:
          "Residencia Militar - EP, Jiron Simon Bolivar 119, Trujillo 13001, Peru",
        items: items.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          options: item.options || [],
        })),
      });

      const payment = await paymentService.createPayment({
        orderId: order.id,
        customerId: user.id,
        amount: order.totalPrice,
        method: paymentMethod,
        successUrl:
          paymentMethod === "PAYPAL"
            ? `${window.location.origin}/paypal-callback`
            : `${window.location.origin}/profile/orders/${order.id}`,
        cancelUrl:
          paymentMethod === "PAYPAL"
            ? `${window.location.origin}/paypal-callback`
            : `${window.location.origin}/checkout`,
      });

      if (paymentMethod === "STRIPE") {
        const stripe = (window as any).Stripe(
          "pk_test_51RdcwWI7XGxEwOVvH5BeW0Vc8j9gd8Sywk5H4JFLTwtyfdCYenuNCgMSHgG2NDAU0Alxd7w22ywH8i3TCfESBLhS00LNXUkHoK",
        );
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId: payment.transactionId,
        });

        if (stripeError) {
          throw new Error(stripeError.message);
        }
      } else if (paymentMethod === "PAYPAL") {
        // PayPal integration - redirect to approval URL
        const paypalOrderId = payment.transactionId;
        const paypalApprovalUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${paypalOrderId}`;
        window.location.href = paypalApprovalUrl;
      }
    } catch (e) {
      setError("Error processing payment");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="flex-1 space-y-4">
        <CheckoutAddress />
        <CheckoutItemList />
        <CheckoutPaymentMethods
          selected={paymentMethod}
          setSelected={setPaymentMethod}
        />
      </div>

      <div className="w-3/8 space-y-4 sticky top-19 h-fit">
        <CheckoutSummary />
        <CheckoutError message={error} />
        <CheckoutProceedButton
          onCheckout={handleCheckout}
          isProcessing={isProcessing}
        />
      </div>
    </>
  );
};
