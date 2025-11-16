import { AuthGateway } from "../../domain/gateways/AuthGateway";
import { TokenRepository } from "../../domain/repositories/TokenRepository";

export class LogoutUseCase {
  constructor(
    private authGateway: AuthGateway,
    private tokenRepository: TokenRepository,
  ) {}

  async execute(): Promise<void> {
    await this.authGateway.logout();
    await this.tokenRepository.set(null);
  }
}
