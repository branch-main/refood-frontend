import axios from "axios";

const paymentsApiClient = axios.create({
  baseURL: import.meta.env.VITE_JAVA_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token interceptor
paymentsApiClient.interceptors.request.use(
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

export type PaymentMethod = "STRIPE" | "PAYPAL" | "YAPE";

export interface CreatePaymentRequest {
  orderId: string;
  customerId: number;
  amount: number;
  method: PaymentMethod;
  successUrl: string;
  cancelUrl: string;
}

export interface PaymentResponse {
  id: string;
  orderId: string;
  customerId: number;
  amount: number;
  method: PaymentMethod;
  status: string;
  transactionId: string;
}

const toPayment = (data: any): PaymentResponse => {
  return {
    id: data.id,
    orderId: data.order_id,
    customerId: data.customer_id,
    amount: data.amount,
    method: data.method,
    status: data.status,
    transactionId: data.transaction_id,
  };
};

export const paymentService = {
  createPayment: async (
    request: CreatePaymentRequest,
  ): Promise<PaymentResponse> => {
    const response = await paymentsApiClient.post<any>("/payments", {
      order_id: request.orderId,
      customer_id: request.customerId,
      amount: request.amount,
      method: request.method,
      success_url: request.successUrl,
      cancel_url: request.cancelUrl,
    });
    return toPayment(response.data);
  },

  getPayment: async (paymentId: string): Promise<PaymentResponse> => {
    const response = await paymentsApiClient.get<any>(`/payments/${paymentId}`);
    return toPayment(response.data);
  },

  getPaymentByOrder: async (orderId: string): Promise<PaymentResponse> => {
    const response = await paymentsApiClient.get<any>("/payments", {
      params: { order_id: orderId },
    });
    return toPayment(response.data);
  },

  getPaymentByTransaction: async (
    transactionId: string,
  ): Promise<PaymentResponse> => {
    const response = await paymentsApiClient.get<any>("/payments", {
      params: { transaction_id: transactionId },
    });
    return toPayment(response.data);
  },

  getPaymentsByCustomer: async (
    customerId: number,
  ): Promise<PaymentResponse[]> => {
    const response = await paymentsApiClient.get<any[]>("/payments/customer", {
      params: { customer_id: customerId },
    });
    return response.data.map(toPayment);
  },

  completePayment: async (paymentId: string): Promise<PaymentResponse> => {
    const response = await paymentsApiClient.post<any>(
      `/payments/${paymentId}/complete`,
    );
    return toPayment(response.data);
  },

  failPayment: async (
    paymentId: string,
    reason?: string,
  ): Promise<PaymentResponse> => {
    const response = await paymentsApiClient.post<any>(
      `/payments/${paymentId}/fail`,
      reason,
    );
    return toPayment(response.data);
  },
};
