import { CartItem, useCart } from "@/features/cart/contexts";
import { useAuth, useMenuItem, useRestaurant, useLocation } from "@/shared/hooks";
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
import { LocationSelector } from "@/shared/components/common";
import { FaLocationDot } from "react-icons/fa6";

const CheckoutAddress = ({ 
  onOpenLocationModal 
}: { 
  onOpenLocationModal: () => void 
}) => {
  const { location, getFormattedAddress } = useLocation();

  return (
    <div className="bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.03)] p-4 flex flex-col gap-4">
      <span className="text-gray-800 font-bold text-lg border-b border-gray-200 pb-4">
        Dirección de entrega
      </span>
      
      <div 
        onClick={onOpenLocationModal}
        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-red-300 hover:bg-red-50 transition"
      >
        <FaLocationDot className="text-red-500 text-xl flex-shrink-0" />
        <div className="flex-1">
          <span className="text-gray-800 font-bold block">
            {location ? getFormattedAddress() : "Seleccionar ubicación"}
          </span>
          {location && (
            <span className="text-xs text-gray-500">
              {location.city}, {location.state} - {location.zipCode}
            </span>
          )}
        </div>
        <span className="text-sm text-red-500 font-medium">Cambiar</span>
      </div>

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
        <span className="text-gray-500 text-sm">
          {items.length === 1 ? "1 producto" : `${items.length} productos`}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="py-8 text-center">
          <div className="text-gray-400 mb-2">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium mb-1">Tu pedido ha sido procesado</p>
          <p className="text-gray-500 text-sm">El carrito se ha vaciado correctamente</p>
        </div>
      ) : (
        <>
          {items.map((item) => <CheckoutItem key={item.cartItemId} item={item} />)}

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <span className="text-gray-800">Entrega estimada</span>
            <span className="text-gray-800 font-bold">
              {restaurant?.minPreparationTime} - {restaurant?.maxPreparationTime}{" "}
              min
            </span>
          </div>
        </>
      )}
    </div>
  );
};

const CheckoutPaymentMethods = ({
  selected,
  setSelected,
  disabled = false,
}: {
  selected: PaymentMethod;
  setSelected: (method: PaymentMethod) => void;
  disabled?: boolean;
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.03)] p-4 flex flex-col gap-4 ${disabled ? "opacity-50" : ""}`}>
      <span className="text-gray-800 font-bold text-lg border-b border-gray-200 pb-4">
        Método de pago
      </span>

      <div className="flex flex-col gap-2">
        <label
          className={`flex items-center gap-3 p-3 border rounded-lg transition ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${selected === "STRIPE" ? "border-green-400 bg-green-50" : "border-gray-200"}`}
        >
          <input
            type="radio"
            name="payment"
            value="STRIPE"
            checked={selected === "STRIPE"}
            onChange={(e) => setSelected(e.target.value as PaymentMethod)}
            className="w-4 h-4 text-green-400"
            disabled={disabled}
          />
          <span className="text-gray-800 font-medium flex items-center gap-2">
            {getPaymentMethodIcon("STRIPE")}
            {getPaymentMethodText("STRIPE")}
          </span>
        </label>

        <label
          className={`flex items-center gap-3 p-3 border rounded-lg transition ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${selected === "PAYPAL" ? "border-green-400 bg-green-50" : "border-gray-200"}`}
        >
          <input
            type="radio"
            name="payment"
            value="PAYPAL"
            checked={selected === "PAYPAL"}
            onChange={(e) => setSelected(e.target.value as PaymentMethod)}
            className="w-4 h-4"
            disabled={disabled}
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
  disabled = false,
}: {
  onCheckout: () => void;
  isProcessing: boolean;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onCheckout}
      disabled={isProcessing || disabled}
      className="bg-green-400 text-white text-sm font-bold px-6 py-3 rounded-lg hover:bg-green-500 transition w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      {isProcessing ? (
        <span className="flex items-center justify-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Procesando...
        </span>
      ) : disabled ? (
        "Carrito vacío"
      ) : (
        "Hacer pedido"
      )}
    </button>
  );
};

export const Checkout = () => {
  const { restaurantId, items, clearCart } = useCart();
  const { location, getFormattedAddress, updateLocation } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("STRIPE");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const hasItems = items.length > 0;

  const handleCheckout = async () => {
    if (!user || !restaurantId || items.length === 0) {
      setError("Missing required information");
      return;
    }

    if (!location) {
      setError("Por favor selecciona una dirección de entrega");
      setIsLocationModalOpen(true); // Auto-open location selector
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const order = await orderService.createOrder({
        customerId: user.id,
        restaurantId: restaurantId,
        deliveryAddress: getFormattedAddress(),
        items: items.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          options: item.options || [],
        })),
      });

      // Clear the cart after successfully creating the order
      clearCart();

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
        <CheckoutAddress onOpenLocationModal={() => setIsLocationModalOpen(true)} />
        <CheckoutItemList />
        <CheckoutPaymentMethods
          selected={paymentMethod}
          setSelected={setPaymentMethod}
          disabled={!hasItems}
        />
      </div>

      <div className="w-3/8 space-y-4 sticky top-19 h-fit">
        <CheckoutSummary />
        <CheckoutError message={error} />
        <CheckoutProceedButton
          onCheckout={handleCheckout}
          isProcessing={isProcessing}
          disabled={!hasItems}
        />
      </div>

      <LocationSelector
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelect={(address) => {
          updateLocation(address);
          setError(null); // Clear error when address is selected
        }}
        currentAddress={location}
      />
    </>
  );
};
