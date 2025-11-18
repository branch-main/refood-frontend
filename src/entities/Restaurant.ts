import { RestaurantOpeningHours } from "./RestaurantOpeningHours";
import { RestaurantStats } from "./RestaurantStats";

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
    public openingHours: RestaurantOpeningHours[],
    public isOpen: boolean,
    public nextOpeningTime: string,
    public createdAt: string | null,
    public updatedAt: string | null,
  ) {}
}
