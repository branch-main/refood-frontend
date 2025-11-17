import { Order, OrderItem, OrderStatus } from "../../../domain/entities/Order";

export type OrderItemResponse = {
  id: number;
  listing_info?: {
    title: string;
  };
  quantity: number;
  subtotal: number;
};

export type RestaurantInfo = {
  id?: number;
  business_name: string;
};

export type OrderResponse = {
  id: number;
  order_number: string;
  user?: number;
  restaurant?: number;
  restaurant_info?: RestaurantInfo;
  status: string;
  items?: OrderItemResponse[];
  total: number;
  pickup_time: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderCreateRequest = {
  restaurant: number;
  items: Array<{
    menu_item: number;
    quantity: number;
  }>;
  pickup_time?: string;
  notes?: string;
};

export function toOrder(dto: OrderResponse): Order {
  return new Order(
    dto.id,
    dto.order_number,
    0,
    dto.restaurant || 0,
    dto.restaurant_info?.business_name || "",
    (dto.status as OrderStatus) || OrderStatus.PENDING,
    dto.items?.map(
      (item) =>
        new OrderItem(
          item.id,
          item.listing_info?.title || "",
          item.quantity,
          0,
          item.subtotal,
        ),
    ) || [],
    dto.total,
    dto.pickup_time,
    dto.notes,
    dto.created_at,
    dto.updated_at,
  );
}

export function toOrderCreateRequest(
  order: Omit<Order, "id" | "createdAt" | "updatedAt">,
): OrderCreateRequest {
  return {
    restaurant: order.restaurantId,
    items: order.items.map((item) => ({
      menu_item: item.id,
      quantity: item.quantity,
    })),
    pickup_time: order.pickupTime || undefined,
    notes: order.notes || undefined,
  };
}
