import { MenuItemOption } from "./MenuItemOption";

export class MenuItem {
  constructor(
    public id: number,
    public restaurantId: number,
    public name: string,
    public description: string,
    public price: number,
    public image: string | null,
    public isAvailable: boolean,
    public options: MenuItemOption[],
  ) {}
}
