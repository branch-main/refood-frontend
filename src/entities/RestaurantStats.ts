export class RestaurantStats {
  constructor(
    public totalSales: number = 0,
    public totalOrders: number = 0,
    public totalItemsSold: number = 0,
    public rating: number = 0,
    public totalReviews: number = 0,
  ) {}
}
