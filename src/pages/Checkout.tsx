import { CartItem, useCart } from "@/features/cart/contexts";
import { useMenuItem, useRestaurant } from "@/shared/hooks";
import { formatPrice, getFallbackImage } from "@/shared/utils";
import { orderService } from "@/shared/services/orderService";
import {
  paymentService,
  PaymentMethod,
} from "@/shared/services/paymentService";
import { useState } from "react";
import { useAuthContext } from "@/shared/contexts";

const CheckoutItem = ({ item }: { item: CartItem }) => {
  const { data: menuItem } = useMenuItem(item.id);
  if (!menuItem) {
    return null;
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg flex gap-4">
      <span className="my-auto text-gray-800 text-sm">x{1}</span>

      <img
        alt={menuItem.name}
        src={getFallbackImage(menuItem.name, menuItem.image)}
        className="h-22 aspect-square rounded-lg object-cover"
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="bg-red-100 text-red-500 text-xs font-bold rounded-md px-1.5 py-px">
            -15%
          </span>
          <span className="text-gray-800 font-bold text-sm line-clamp-1">
            {menuItem.name}
          </span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-gray-800 font-bold text-sm">{item.price}</span>
          <span className="text-gray-500 line-through text-sm">
            {item.price}
          </span>
        </div>
        <span className="text-gray-500 text-xs line-clamp-2">
          {menuItem.description}
        </span>
      </div>
    </div>
  );
};

export const Checkout = () => {
  const subtotal = 10;
  const shippingCost = 10;
  const serviceFee = 10;

  const { restaurant: restaurantId, items } = useCart();
  const { data: restaurant } = useRestaurant(restaurantId);
  const { user } = useAuthContext();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("STRIPE");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!user || !restaurantId || !items || items.length === 0) {
      setError("Missing required information");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // 1. Create order
      const order = await orderService.createOrder({
        customerId: user.id,
        restaurantId: restaurantId,
        deliveryAddress:
          "Residencia Militar - EP, Jiron Simon Bolivar 119, Trujillo 13001, Peru",
        items: items.map((item) => ({
          menuItemId: item.id,
          quantity: 1, // TODO: get from cart
          options: [], // TODO: get from cart
        })),
      });

      // 2. Create payment
      const payment = await paymentService.createPayment({
        orderId: order.id,
        customerId: user.id,
        amount: order.totalPrice,
        method: selectedMethod,
      });

      // 3. Redirect to Stripe Checkout if using Stripe
      if (selectedMethod === "STRIPE") {
        const stripe = (window as any).Stripe(
          "pk_test_51RdcwWI7XGxEwOVvH5BeW0Vc8j9gd8Sywk5H4JFLTwtyfdCYenuNCgMSHgG2NDAU0Alxd7w22ywH8i3TCfESBLhS00LNXUkHoK",
        );
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId: payment.transactionId,
        });

        if (stripeError) {
          throw new Error(stripeError.message);
        }
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      setError(err.message || "Error processing payment");
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-[58%] mx-auto py-8 flex gap-4">
      <div className="w-full space-y-4">
        <div className="bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.03)] p-4 flex flex-col gap-4">
          <span className="text-gray-800 font-bold text-lg border-b border-gray-200 pb-4">
            Dirección de entrega
          </span>
          <span className="text-gray-800 font-bold">
            Residencia Militar - EP, Jiron Simon Bolivar 119, Trujillo 13001,
            Peru
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

        <div className="bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.03)] p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <div className="inline-flex gap-4 items-center">
              <img
                alt={restaurant?.name || "Restaurant Logo"}
                src={restaurant?.logo}
                className="w-9 aspect-square rounded-full object-cover"
              />
              <span className="text-gray-800 font-bold text-lg">
                {restaurant?.name}
              </span>
            </div>
            <span className="text-gray-500 text-sm">1 producto</span>
          </div>

          {items &&
            items.map((item) => <CheckoutItem key={item.id} item={item} />)}

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-gray-800">Entrega estimada</span>
            <span className="text-gray-800 font-bold">
              {restaurant?.minPreparationTime} -{" "}
              {restaurant?.maxPreparationTime} min
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.03)] p-4 flex flex-col gap-4">
          <span className="text-gray-800 font-bold text-lg border-b border-gray-200 pb-4">
            Método de pago
          </span>

          <div className="flex flex-col gap-2">
            <label
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${selectedMethod === "STRIPE" ? "border-green-400 bg-green-50" : "border-gray-200"}`}
            >
              <input
                type="radio"
                name="payment"
                value="STRIPE"
                checked={selectedMethod === "STRIPE"}
                onChange={(e) =>
                  setSelectedMethod(e.target.value as PaymentMethod)
                }
                className="w-4 h-4 text-green-400"
              />
              <span className="text-gray-800 font-medium">💳 Stripe</span>
            </label>

            <label
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-not-allowed opacity-50 transition ${selectedMethod === "PAYPAL" ? "border-green-400 bg-green-50" : "border-gray-200"}`}
            >
              <input
                type="radio"
                name="payment"
                value="PAYPAL"
                disabled
                className="w-4 h-4"
              />
              <span className="text-gray-800 font-medium">
                🅿️ PayPal (Próximamente)
              </span>
            </label>

            <label
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-not-allowed opacity-50 transition ${selectedMethod === "YAPE" ? "border-green-400 bg-green-50" : "border-gray-200"}`}
            >
              <input
                type="radio"
                name="payment"
                value="YAPE"
                disabled
                className="w-4 h-4"
              />
              <span className="text-gray-800 font-medium">
                📱 Yape (Próximamente)
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-4 sticky top-18 h-fit">
        <div className="p-4 bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.03)] w-[450px] space-y-4 border-gray-200">
          <h1 className="text-lg text-gray-800 font-bold border-b border-gray-200 pb-4">
            Resumen
          </h1>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <span className="text-gray-700 text-sm">Subtotal</span>
              <span className="text-gray-700 text-sm">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 text-sm">Costo de envío</span>
              <span className="text-gray-700 text-sm">
                {formatPrice(shippingCost)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700 text-sm">Tarifa de servicio</span>
              <span className="text-gray-700 text-sm">
                {formatPrice(serviceFee)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-800 font-bold">Total</span>
              <span className="text-gray-800 font-bold">
                {formatPrice(subtotal + shippingCost + serviceFee)}
              </span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={isProcessing || !user}
          className="bg-green-400 text-white text-sm font-bold px-6 py-3 rounded-lg hover:bg-green-500 transition w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Procesando...
            </span>
          ) : (
            "Hacer pedido"
          )}
        </button>
      </div>
    </div>
  );
};
