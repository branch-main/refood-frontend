import { Restaurant } from "../../domain/entities/Restaurant";
import { RestaurantRepository } from "../../domain/repositories/RestaurantRepository";

export class UpdateRestaurantUseCase {
  constructor(private repository: RestaurantRepository) {}

  async execute(id: number, restaurant: Restaurant): Promise<void> {
    await this.repository.update(id, restaurant);
  }
}
