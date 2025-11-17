export enum OrderStatus {
  PENDING,
  CONFIRMED,
  DELIVERYING,
  COMPLETED,
}

export class OrderItemOption {
  constructor(
    public name: string,
    public value: string,
    public price: number,
  ) {}
}

export class OrderItem {
  constructor(
    public menuItemId: number,
    public quantity: number,
    public price: number,
    public options: OrderItemOption[],
  ) {}
}

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
