import { AuthGateway } from "../../domain/gateways/AuthGateway";
import { TokenRepository } from "../../domain/repositories/TokenRepository";

export class LoginUseCase {
  constructor(
    private authGateway: AuthGateway,
    private tokenRepository: TokenRepository,
  ) {}

  async execute(email: string, password: string) {
    const { token, user } = await this.authGateway.login(email, password);
    await this.tokenRepository.set(token);
    return { token, user };
  }
}
