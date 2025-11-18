import { OrderItem } from "./OrderItem";
import { OrderStatus } from "./OrderStatus";

export class Order {
  constructor(
    public id: number,
    public customerId: number,
    public restaurantId: number,
    public deliveryDriverId: number | null,
    public status: OrderStatus,
    public items: OrderItem[],
    public deliveryAddress: string,
    public deliveryFee: number,
  ) {}
}
