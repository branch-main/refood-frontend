import axios from "axios";
import { Order } from "../types";

const ordersApiClient = axios.create({
  baseURL: import.meta.env.VITE_JAVA_API_BASE_URL,
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

export interface DashboardStats {
  todayEarnings: number;
  yesterdayEarnings: number;
  todayOrders: number;
  yesterdayOrders: number;
  todayItems: number;
  yesterdayItems: number;
  weeklyEarnings: number[];
  recentOrders: Order[];
}

const toOrder = (data: any): Order => {
  return {
    id: data.id,
    customerId: data.customer_id,
    customerFirstName: data.customer_first_name,
    customerLastName: data.customer_last_name,
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
    deliveredAt: data.delivered_at,
    totalPrice: data.total_price,
    createdAt: data.created_at,
  };
};

const toDashboardStats = (data: any): DashboardStats => {
  return {
    todayEarnings: parseFloat(data.today_earnings),
    yesterdayEarnings: parseFloat(data.yesterday_earnings),
    todayOrders: data.today_orders,
    yesterdayOrders: data.yesterday_orders,
    todayItems: data.today_items,
    yesterdayItems: data.yesterday_items,
    weeklyEarnings: data.weekly_earnings.map((e: string) => parseFloat(e)),
    recentOrders: data.recent_orders.map(toOrder),
  };
};

export interface RestaurantStats {
  restaurantId: number;
  totalSales: number;
  totalOrders: number;
}

export interface DailyDataPoint {
  date: string;
  value: number;
}

export interface TopProduct {
  menuItemId: number;
  name: string;
  image: string | null;
  quantitySold: number;
  revenue: number;
}

export interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  totalItemsSold: number;
  averageOrderValue: number;
  revenueChange: number;
  ordersChange: number;
  dailyRevenue: DailyDataPoint[];
  dailyOrders: DailyDataPoint[];
  topProducts: TopProduct[];
  uniqueCustomers: number;
  newCustomers: number;
  returningCustomers: number;
  ordersByStatus: Record<string, number>;
}

const toRestaurantStats = (data: any): RestaurantStats => {
  return {
    restaurantId: data.restaurant_id,
    totalSales: parseFloat(data.total_sales),
    totalOrders: data.total_orders,
  };
};

const toAnalytics = (data: any): Analytics => {
  return {
    totalRevenue: parseFloat(data.total_revenue),
    totalOrders: data.total_orders,
    totalItemsSold: data.total_items_sold,
    averageOrderValue: parseFloat(data.average_order_value),
    revenueChange: data.revenue_change,
    ordersChange: data.orders_change,
    dailyRevenue: data.daily_revenue.map((d: any) => ({
      date: d.date,
      value: parseFloat(d.value),
    })),
    dailyOrders: data.daily_orders.map((d: any) => ({
      date: d.date,
      value: parseFloat(d.value),
    })),
    topProducts: data.top_products.map((p: any) => ({
      menuItemId: p.menu_item_id,
      name: p.name,
      image: p.image,
      quantitySold: p.quantity_sold,
      revenue: parseFloat(p.revenue),
    })),
    uniqueCustomers: data.unique_customers,
    newCustomers: data.new_customers,
    returningCustomers: data.returning_customers,
    ordersByStatus: data.orders_by_status,
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

  getOrder: async (id: string): Promise<Order> => {
    const response = await ordersApiClient.get<any>(`/orders/${id}`);
    return toOrder(response.data);
  },

  getOrders: async (customerId: number): Promise<Order[]> => {
    const response = await ordersApiClient.get<any[]>(
      `/orders?customer_id=${customerId}`,
    );
    return response.data.map(toOrder);
  },

  getOrdersByRestaurant: async (restaurantId: number): Promise<Order[]> => {
    const response = await ordersApiClient.get<any[]>(
      `/orders?restaurant_id=${restaurantId}`,
    );
    return response.data.map(toOrder);
  },

  confirmOrder: async (orderId: string): Promise<Order> => {
    const response = await ordersApiClient.post<any>(`/orders/${orderId}/confirm`);
    return toOrder(response.data);
  },

  startPreparation: async (orderId: string): Promise<Order> => {
    const response = await ordersApiClient.post<any>(`/orders/${orderId}/start-preparation`);
    return toOrder(response.data);
  },

  markReady: async (orderId: string): Promise<Order> => {
    const response = await ordersApiClient.post<any>(`/orders/${orderId}/mark-ready`);
    return toOrder(response.data);
  },

  cancelOrder: async (orderId: string, reason: string): Promise<Order> => {
    const response = await ordersApiClient.post<any>(`/orders/${orderId}/cancel`, { reason });
    return toOrder(response.data);
  },

  getDashboardStats: async (restaurantIds: number[]): Promise<DashboardStats> => {
    const response = await ordersApiClient.get<any>(
      `/orders/dashboard-stats?restaurant_ids=${restaurantIds.join(",")}`
    );
    return toDashboardStats(response.data);
  },

  getRestaurantStats: async (restaurantIds: number[]): Promise<RestaurantStats[]> => {
    const response = await ordersApiClient.get<any[]>(
      `/orders/restaurant-stats?restaurant_ids=${restaurantIds.join(",")}`
    );
    return response.data.map(toRestaurantStats);
  },

  getAnalytics: async (restaurantIds: number[], period: string = "7d"): Promise<Analytics> => {
    const response = await ordersApiClient.get<any>(
      `/orders/analytics?restaurant_ids=${restaurantIds.join(",")}&period=${period}`
    );
    return toAnalytics(response.data);
  },
};
