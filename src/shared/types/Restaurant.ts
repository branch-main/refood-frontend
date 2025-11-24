export enum DayOfWeek {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}

export type OpeningHours = {
  day: DayOfWeek;
  openingTime: string;
  closingTime: string;
};

type RestaurantStats = {
  totalSales: number;
  totalOrders: number;
  totalItemsSold: number;
  rating: number;
  totalReviews: number;
};

export type Restaurant = {
  id: number;
  name: string;
  description: string;
  email: string;
  phone: string;
  minPreparationTime: number;
  maxPreparationTime: number;
  address: string;
  latitude: number | null;
  longitude: number | null;
  logo: string | null;
  banner: string | null;
  isActive: boolean;
  stats: RestaurantStats;
  openingHours: OpeningHours[];
  isOpen: boolean;
  nextOpeningTime: string;
  bestDiscount: number;
  createdAt: string | null;
  updatedAt: string | null;
};
