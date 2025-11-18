import { MenuItemChoice } from "./MenuItemChoice";

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
