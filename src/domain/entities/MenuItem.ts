export class MenuItemChoice {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public isAvailable: boolean,
  ) {}
}

export class MenuItemOption {
  constructor(
    public id: number,
    public name: string,
    public minChoices: number,
    public maxChoices: number,
    public isRequired: boolean,
    public choices: MenuItemChoice[],
  ) {}
}

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
