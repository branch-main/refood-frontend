import { User } from "../entities/User";

export interface UserRepository {
  create(user: User): Promise<void>;
  update(id: number, user: User): Promise<void>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<User | null>;
}
