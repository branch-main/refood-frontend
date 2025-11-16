import { LocalStorageTokenRepository } from "./infrastructure/repositories/LocalStorageTokenRepository";
import { ApiAuthGateway } from "./infrastructure/gateways/ApiAuthGateway";
import { apiClient } from "./infrastructure/api/axios.config";
import { ApiRestaurantRepository } from "./infrastructure/repositories/ApiRestaurantRepository";
import { ApiMenuItemRepository } from "./infrastructure/repositories/ApiMenuItemRepository";

class Container {
  private map = new Map();

  register<T>(name: string, impl: T): void {
    this.map.set(name, impl);
  }

  resolve<T>(name: string): T {
    const dependency = this.map.get(name);
    if (!dependency) {
      throw new Error(`Implementation ${name} not found`);
    }
    return dependency;
  }
}

export const container = new Container();

container.register("AuthGateway", new ApiAuthGateway(apiClient));
container.register("TokenRepository", new LocalStorageTokenRepository());
container.register(
  "RestaurantRepository",
  new ApiRestaurantRepository(apiClient),
);
container.register("MenuItemRepository", new ApiMenuItemRepository(apiClient));

const menuItemRepository = container.resolve("MenuItemRepository");

menuItemRepository.getAll().then((items) => console.log(items));
