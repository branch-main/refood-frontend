import { Restaurant } from "../../domain/entities/Restaurant";
import { RestaurantRepository } from "../../domain/repositories/RestaurantRepository";
import { ApiClient } from "../api/ApiClient";
import {
  RestaurantResponse,
  toRestaurant,
  toRestaurantUpdateDto,
} from "../api/dtos/RestaurantDto";

export class ApiRestaurantRepository implements RestaurantRepository {
  constructor(private apiClient: ApiClient) {}

  async create(restaurant: Restaurant): Promise<void> {
    await this.apiClient.post("/restaurants/", restaurant);
  }

  async update(id: number, restaurant: Restaurant): Promise<void> {
    const updateDto = toRestaurantUpdateDto(restaurant);
    await this.apiClient.patch(`/restaurants/${id}/`, updateDto);
  }

  async delete(id: number): Promise<void> {
    await this.apiClient.delete(`/restaurants/${id}/`);
  }

  async getById(id: number): Promise<Restaurant | null> {
    return this.apiClient
      .get<RestaurantResponse>(`/restaurants/${id}/`)
      .then(toRestaurant)
      .catch(() => null);
  }

  async getAll(): Promise<Restaurant[]> {
    return this.apiClient
      .get<RestaurantResponse[]>("/restaurants/")
      .then((response) => response.map(toRestaurant));
  }
}
