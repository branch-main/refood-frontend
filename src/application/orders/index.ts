import { Order } from "../../domain/entities/Order";
import { OrderRepository } from "../../domain/repositories/OrderRepository";

export class GetOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<Order[]> {
    return this.orderRepository.getAll();
  }
}

export class GetOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(id: number): Promise<Order | null> {
    return this.orderRepository.getById(id);
  }
}

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(order: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> {
    return this.orderRepository.create(order);
  }
}

export class CancelOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(id: number): Promise<void> {
    return this.orderRepository.cancel(id);
  }
}

export class GetOrdersByStatusUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(status: string): Promise<Order[]> {
    return this.orderRepository.getByStatus(status);
  }
}
