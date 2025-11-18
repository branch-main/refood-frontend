export class UserAddress {
  constructor(
    public id: number,
    public street: string,
    public city: string,
    public state: string,
    public zipCode: string,
    public latitude: number | null,
    public longitude: number | null,
    public isDefault: boolean,
  ) {}
}
