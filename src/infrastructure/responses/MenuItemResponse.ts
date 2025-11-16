import {
  MenuItem,
  MenuItemChoice,
  MenuItemOption,
} from "../../domain/entities/MenuItem";

type MenuItemChoiceResponse = {
  id: number;
  name: string;
  price: number;
  is_available: boolean;
};

type MenuItemOptionResponse = {
  id: number;
  name: string;
  min_choices: number;
  max_choices: number;
  is_required: boolean;
  choices: MenuItemChoiceResponse[];
};

export type MenuItemResponse = {
  id: number;
  restaurant_id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  is_available: boolean;
  options: MenuItemOptionResponse[];
};

export function toMenuItem(response: MenuItemResponse) {
  return new MenuItem(
    response.id,
    response.restaurant_id,
    response.name,
    response.description,
    response.price,
    response.image,
    response.is_available,
    [],
    // response.options.map(
    //   (option) =>
    //     new MenuItemOption(
    //       option.id,
    //       option.name,
    //       option.min_choices,
    //       option.max_choices,
    //       option.is_required,
    //       option.choices.map(
    //         (choice) =>
    //           new MenuItemChoice(
    //             choice.id,
    //             choice.name,
    //             choice.price,
    //             choice.is_available,
    //           ),
    //       ),
    //     ),
    // ),
  );
}
