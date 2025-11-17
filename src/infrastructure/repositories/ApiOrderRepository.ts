import { Order } from "../../domain/entities/Order";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { ApiClient } from "../api/ApiClient";
import { OrderResponse, toOrder, toOrderCreateRequest } from "../api/dtos/OrderDto";

export class ApiOrderRepository implements OrderRepository {
  constructor(private apiClient: ApiClient) {}

  async create(order: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> {
    const createRequest = toOrderCreateRequest(order);
    const response = await this.apiClient.post<OrderResponse>(
      "/orders/",
      createRequest,
    );
    return toOrder(response);
  }

  async getById(id: number): Promise<Order | null> {
    return this.apiClient
      .get<OrderResponse>(`/orders/${id}/`)
      .then(toOrder)
      .catch(() => null);
  }

  async getAll(): Promise<Order[]> {
    return this.apiClient
      .get<OrderResponse[]>("/orders/")
      .then((response) => response.map(toOrder));
  }

  async getByStatus(status: string): Promise<Order[]> {
    return this.apiClient
      .get<OrderResponse[]>("/orders/", { params: { status } })
      .then((response) => response.map(toOrder));
  }

  async cancel(id: number): Promise<void> {
    await this.apiClient.post(`/orders/${id}/cancel/`, {});
  }

  async confirm(id: number): Promise<void> {
    await this.apiClient.post(`/orders/${id}/confirm/`, {});
  }

  async markReady(id: number): Promise<void> {
    await this.apiClient.post(`/orders/${id}/ready/`, {});
  }

  async complete(id: number): Promise<void> {
    await this.apiClient.post(`/orders/${id}/complete/`, {});
  }
}
