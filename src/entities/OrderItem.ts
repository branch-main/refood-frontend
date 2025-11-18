import { OrderItemOption } from "./OrderItemOption";

export class OrderItem {
  constructor(
    public menuItemId: number,
    public quantity: number,
    public price: number,
    public options: OrderItemOption[],
  ) {}
}
