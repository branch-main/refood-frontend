enum OrderStatus {
  PENDING,
  CONFIRMED,
  DELIVERYING,
  COMPLETED,
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
  id: number;
  customerId: number;
  restaurantId: number;
  deliveryDriverId: number | null;
  status: OrderStatus;
  items: OrderItem[];
  deliveryAddress: string;
  deliveryFee: number;
};
