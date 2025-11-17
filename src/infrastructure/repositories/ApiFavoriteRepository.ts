import { Favorite } from "../../domain/entities/Favorite";
import { FavoriteRepository } from "../../domain/repositories/FavoriteRepository";
import { ApiClient } from "../api/ApiClient";
import {
  FavoriteResponse,
  toFavorite,
  toFavoriteCreateRequest,
} from "../api/dtos/FavoriteDto";

export class ApiFavoriteRepository implements FavoriteRepository {
  constructor(private apiClient: ApiClient) {}

  async create(restaurantId: number): Promise<Favorite> {
    const createRequest = toFavoriteCreateRequest(restaurantId);
    const response = await this.apiClient.post<FavoriteResponse>(
      "/favorites/",
      createRequest,
    );
    return toFavorite(response);
  }

  async delete(id: number): Promise<void> {
    await this.apiClient.delete(`/favorites/${id}/`);
  }

  async getAll(): Promise<Favorite[]> {
    return this.apiClient
      .get<FavoriteResponse[]>("/favorites/")
      .then((response) => response.map(toFavorite))
      .catch(() => []);
  }

  async getByRestaurantId(restaurantId: number): Promise<Favorite | null> {
    return this.apiClient
      .get<FavoriteResponse[]>("/favorites/", { params: { restaurant: restaurantId } })
      .then((response) => (response.length > 0 ? toFavorite(response[0]) : null))
      .catch(() => null);
  }

  async isFavorite(restaurantId: number): Promise<boolean> {
    try {
      const response = await this.apiClient.get<FavoriteResponse[]>(
        "/favorites/",
        { params: { restaurant: restaurantId } },
      );
      return response.length > 0;
    } catch {
      return false;
    }
  }

  async toggle(restaurantId: number): Promise<Favorite | null> {
    const existing = await this.getByRestaurantId(restaurantId);
    if (existing) {
      await this.delete(existing.id);
      return null;
    } else {
      return await this.create(restaurantId);
    }
  }
}
