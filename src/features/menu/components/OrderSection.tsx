import { useState } from "react";
import { Button } from "@/shared/components/ui";
import { formatPrice } from "@/shared/utils";
import { FiMinus, FiPlus, FiShoppingCart, FiAlertCircle } from "react-icons/fi";
import { MenuItem } from "@/entities";

interface OrderSectionProps {
  item: MenuItem;
  onOrder: (quantity: number) => void;
}

export const OrderSection = ({ item, onOrder }: OrderSectionProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < item.quantity) setQuantity(quantity + 1);
  };

  if (item.quantity === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <FiAlertCircle className="text-gray-400 text-2xl flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-base font-semibold text-gray-900 mb-1">
              No disponible
            </h4>
            <p className="text-sm text-gray-600">
              Este artículo está agotado temporalmente
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Realizar pedido
          </h3>
          {item.quantity <= 5 && (
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2.5 py-1 rounded">
              ¡Pocas unidades!
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="text-base font-medium text-gray-700">
            Cantidad
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
            >
              <FiMinus className="text-gray-600 text-lg" />
            </button>
            <span className="text-xl font-semibold text-gray-900 min-w-[2.5rem] text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= item.quantity}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 active:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
            >
              <FiPlus className="text-gray-600 text-lg" />
            </button>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-5 space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-gray-600">Precio unitario</span>
            <span className="text-base font-medium text-gray-900">
              {formatPrice(item.price)}
            </span>
          </div>
          <div className="flex items-baseline justify-between pt-2 border-t border-gray-200">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-[#B21F1F]">
              {formatPrice(item.price * quantity)}
            </span>
          </div>
        </div>

        <Button onClick={() => onOrder(quantity)} fullWidth size="large">
          <FiShoppingCart className="text-lg" />
          Añadir al carrito
        </Button>
      </div>
    </div>
  );
};
