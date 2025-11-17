import { Favorite } from "../../domain/entities/Favorite";
import { FavoriteRepository } from "../../domain/repositories/FavoriteRepository";

export class GetFavoritesUseCase {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async execute(): Promise<Favorite[]> {
    return this.favoriteRepository.getAll();
  }
}

export class AddFavoriteUseCase {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async execute(restaurantId: number): Promise<Favorite> {
    return this.favoriteRepository.create(restaurantId);
  }
}

export class RemoveFavoriteUseCase {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async execute(id: number): Promise<void> {
    return this.favoriteRepository.delete(id);
  }
}

export class IsFavoriteUseCase {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async execute(restaurantId: number): Promise<boolean> {
    return this.favoriteRepository.isFavorite(restaurantId);
  }
}

export class ToggleFavoriteUseCase {
  constructor(private favoriteRepository: FavoriteRepository) {}

  async execute(restaurantId: number): Promise<Favorite | null> {
    return this.favoriteRepository.toggle(restaurantId);
  }
}
