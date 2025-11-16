import { Restaurant } from "../../domain/entities/Restaurant";
import { RestaurantRepository } from "../../domain/repositories/RestaurantRepository";

export class GetRestaurantsUseCase {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async execute(): Promise<Restaurant[]> {
    return this.restaurantRepository.getAll();
  }
}
