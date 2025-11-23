import axios from "axios";
import { Order } from "../types";

// Separate API client for orders (port 8081)
const ordersApiClient = axios.create({
  baseURL: "http://localhost:8081/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token interceptor
ordersApiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export interface CreateOrderRequest {
  customerId: number;
  restaurantId: number;
  deliveryAddress: string;
  items: {
    menuItemId: number;
    quantity: number;
    options: { name: string; value: string }[];
  }[];
}

const toOrder = (data: any): Order => {
  return {
    id: data.id,
    customerId: data.customer_id,
    restaurantId: data.restaurant_id,
    deliveryDriverId: data.delivery_driver_id,
    status: data.status,
    items: data.items.map((item: any) => ({
      menuItemId: item.menu_item_id,
      quantity: item.quantity,
      price: item.price,
      options: item.options.map((option: any) => ({
        name: option.name,
        value: option.value,
        price: option.price,
      })),
    })),
    deliveryAddress: data.delivery_address,
    deliveryFee: data.delivery_fee,
    totalPrice: data.total_price,
    createdAt: data.created_at,
  };
};

export const orderService = {
  createOrder: async (request: CreateOrderRequest): Promise<Order> => {
    const response = await ordersApiClient.post<any>("/orders", {
      customer_id: request.customerId,
      restaurant_id: request.restaurantId,
      delivery_address: request.deliveryAddress,
      items: request.items.map((item) => ({
        menu_item_id: item.menuItemId,
        quantity: item.quantity,
        options: item.options.map((option) => ({
          name: option.name,
          value: option.value,
        })),
      })),
    });
    return toOrder(response.data);
  },

  getOrders: async (customerId: number): Promise<Order[]> => {
    const response = await ordersApiClient.get<any[]>(
      `/orders?customer_id=${customerId}`,
    );
    return response.data.map(toOrder);
  },

  getOrder: async (id: string): Promise<Order> => {
    const response = await ordersApiClient.get<any>(`/orders/${id}`);
    return toOrder(response.data);
  },
};
