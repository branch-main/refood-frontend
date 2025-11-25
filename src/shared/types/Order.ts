export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PREPARING = "PREPARING",
  READY = "READY",
  DELIVERING = "DELIVERING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export type OrderItemOption = {
  name: string;
  value: string;
  price: number;
};

export type OrderItem = {
  menuItemId: number;
  quantity: number;
  price: number;
  options: OrderItemOption[];
};

export type Order = {
  id: string;
  customerId: number;
  restaurantId: number;
  deliveryDriverId: number | null;
  status: OrderStatus;
  items: OrderItem[];
  deliveryAddress: string;
  deliveryFee: number;
  totalPrice: number;
  createdAt: string;
  deliveredAt: string | null;
};
