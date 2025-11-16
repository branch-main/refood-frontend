export enum UserRole {
  CUSTOMER = "customer",
  DELIVERY_DRIVER = "delivery_driver",
  RESTAURANT_OWNER = "restaurant_owner",
  ADMIN = "admin",
}

export class Address {
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

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public image: string | null,
    public role: UserRole,
    public addresses: Address[],
    public favorites: number[],
    public createdAt: string | null,
    public updatedAt: string | null,
  ) {}
}
