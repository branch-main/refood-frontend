export enum DayOfWeek {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}

export class OpeningHours {
  constructor(
    public day: DayOfWeek = DayOfWeek.MONDAY,
    public openingTime: string = "00:00",
    public closingTime: string = "00:00",
  ) {}
}

export class RestaurantStats {
  constructor(
    public totalSales: number = 0,
    public totalOrders: number = 0,
    public totalItemsSold: number = 0,
    public rating: number = 0,
    public totalReviews: number = 0,
  ) {}
}

export class Restaurant {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public email: string,
    public phone: string,
    public address: string,
    public latitude: number | null,
    public longitude: number | null,
    public logo: string | null,
    public banner: string | null,
    public isActive: boolean,
    public stats: RestaurantStats,
    public openingHours: OpeningHours[],
    public createdAt: string | null,
    public updatedAt: string | null,
  ) {}
}
