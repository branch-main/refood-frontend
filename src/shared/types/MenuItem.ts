export type MenuItemChoice = {
  id: number;
  name: string;
  price: number;
  isAvailable: boolean;
};

export type MenuItemOption = {
  id: number;
  name: string;
  minChoices: number;
  maxChoices: number;
  isRequired: boolean;
  choices: MenuItemChoice[];
};

export type MenuItem = {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  discountPrice: number | null;
  image: string | null;
  isAvailable: boolean;
  options: MenuItemOption[];
};
