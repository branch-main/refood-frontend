export interface TokenRepository {
  get(): Promise<string | null>;
  set(token: string | null): Promise<void>;
}
