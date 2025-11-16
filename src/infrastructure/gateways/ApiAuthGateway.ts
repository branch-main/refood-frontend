import { AuthGateway, AuthResult } from "../../domain/gateways/AuthGateway";
import { ApiClient } from "../api/ApiClient";

export class ApiAuthGateway implements AuthGateway {
  constructor(private apiClient: ApiClient) {}

  async me(): Promise<any> {
    return this.apiClient.get("/users/me/");
  }

  async login(email: string, password: string): Promise<AuthResult> {
    return this.apiClient.post("/auth/login/", { email, password });
  }

  async logout(): Promise<void> {
    this.apiClient.post("/auth/logout/");
  }
}
