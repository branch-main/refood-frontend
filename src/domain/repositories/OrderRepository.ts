import { Order } from "../entities/Order";

export interface OrderRepository {
  create(order: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order>;
  getById(id: number): Promise<Order | null>;
  getAll(): Promise<Order[]>;
  getByStatus(status: string): Promise<Order[]>;
  cancel(id: number): Promise<void>;
  confirm(id: number): Promise<void>;
  markReady(id: number): Promise<void>;
  complete(id: number): Promise<void>;
}
