import { Restaurant } from "../../domain/entities/Restaurant";
import { RestaurantRepository } from "../../domain/repositories/RestaurantRepository";

export class GetRestaurantUseCase {
  constructor(private restaurantRepository: RestaurantRepository) {}

  async execute(id: number): Promise<Restaurant | null> {
    return this.restaurantRepository.getById(id);
  }
}
