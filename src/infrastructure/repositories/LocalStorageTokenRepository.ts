import { TokenRepository } from "../../domain/repositories/TokenRepository";

export class LocalStorageTokenRepository implements TokenRepository {
  private STORAGE_KEY = "auth_token";

  async get(): Promise<string | null> {
    return localStorage.getItem(this.STORAGE_KEY);
  }

  async set(token: string | null): Promise<void> {
    if (token) {
      localStorage.setItem(this.STORAGE_KEY, token);
    } else {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
}
