import { useState, useEffect } from "react";
import { Order, OrderStatus, MenuItem } from "@/shared/types";
import { Modal } from "@/shared/components/ui/Modal";
import { menuService } from "@/shared/services";
import {
  formatPrice,
  formatDate,
  formatTimeFromDate,
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
} from "react-icons/fi";
import { GiCookingPot } from "react-icons/gi";
import { MdOutlineDoneAll } from "react-icons/md";
import { IoClose } from "react-icons/io5";

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onStartPreparation?: (orderId: string) => void;
  onMarkReady?: (orderId: string) => void;
  onCancel?: (orderId: string) => void;
  isLoading?: boolean;
  readOnly?: boolean;
}

export const OrderDetailModal = ({
  order,
  isOpen,
  onClose,
  onStartPreparation,
  onMarkReady,
  onCancel,
  isLoading = false,
  readOnly = false,
}: OrderDetailModalProps) => {
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
    !readOnly &&
    order.status !== OrderStatus.COMPLETED &&
    order.status !== OrderStatus.CANCELLED &&
    order.status !== OrderStatus.DELIVERING &&
    order.status !== OrderStatus.READY;

  const showActions = !readOnly;

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
            {/* Customer Info */}
            {(order.customerFirstName || order.customerLastName) && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                  Cliente
                </h3>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-900">
                    {order.customerFirstName} {order.customerLastName}
                  </span>
                </div>
              </div>
            )}

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
            {showActions && canCancel && onCancel && (
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

            {showActions && order.status === OrderStatus.CONFIRMED && onStartPreparation && (
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

            {showActions && order.status === OrderStatus.PREPARING && onMarkReady && (
              <button
                onClick={() => {
                  onMarkReady(order.id);
                  onClose();
                }}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 text-white rounded-xl font-medium text-sm hover:bg-emerald-600 transition-colors disabled:opacity-50"
              >
                <MdOutlineDoneAll className="w-4 h-4" />
                Marcar como listo
              </button>
            )}

            {showActions && order.status === OrderStatus.READY && (
              <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-100 text-emerald-700 rounded-xl font-medium text-sm">
                <FiClock className="w-4 h-4" />
                Esperando repartidor
              </div>
            )}

            {showActions && order.status === OrderStatus.DELIVERING && (
              <div className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-100 text-orange-700 rounded-xl font-medium text-sm">
                <FiClock className="w-4 h-4" />
                En camino
              </div>
            )}

            {(readOnly || order.status === OrderStatus.COMPLETED || order.status === OrderStatus.CANCELLED) && (
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
