import { DayOfWeek } from "./DayOfWeek";

export class RestaurantOpeningHours {
  constructor(
    public day: DayOfWeek = DayOfWeek.MONDAY,
    public openingTime: string = "00:00:00",
    public closingTime: string = "00:00:00",
  ) {}
}
