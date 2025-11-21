import { apiClient } from "../api/client";

export interface Order {
  id: number;
  customerId: number;
  restaurantId: number;
  items: OrderItem[];
  status: "pending" | "accepted" | "preparing" | "ready" | "completed" | "cancelled";
  total: number;
  pickupTime: string;
  createdAt: string;
}

export interface OrderItem {
  menuItemId: number;
  quantity: number;
  price: number;
  notes?: string;
}

export interface CreateOrderData {
  restaurantId: number;
  items: OrderItem[];
  pickupTime: string;
}

export const orderService = {
  // Customer - Create and view orders
  createOrder: async (orderData: CreateOrderData) => {
    const { data } = await apiClient.post("/orders", orderData);
    return data;
  },

  getMyOrders: async () => {
    const { data } = await apiClient.get("/orders/my-orders");
    return data;
  },

  getOrder: async (id: number) => {
    const { data } = await apiClient.get(`/orders/${id}`);
    return data;
  },

  cancelOrder: async (id: number) => {
    const { data } = await apiClient.patch(`/orders/${id}/cancel`);
    return data;
  },

  // Partner - Manage restaurant orders
  getRestaurantOrders: async (status?: string) => {
    const params = status ? { status } : {};
    const { data } = await apiClient.get("/partner/orders", { params });
    return data;
  },

  updateOrderStatus: async (
    id: number,
    status: Order["status"]
  ) => {
    const { data } = await apiClient.patch(`/partner/orders/${id}/status`, {
      status,
    });
    return data;
  },
};
