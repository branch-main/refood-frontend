import { UserAddress } from "./UserAddress";
import { UserRole } from "./UserRole";

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public image: string | null,
    public role: UserRole,
    public addresses: UserAddress[],
    public favorites: number[],
    public createdAt: string | null,
    public updatedAt: string | null,
  ) {}
}
