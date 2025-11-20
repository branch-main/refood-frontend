import { useQuery } from "@tanstack/react-query";
import { menuService } from "../services";

export const useRestaurantMenu = (restaurantId?: number) =>
  useQuery({
    queryKey: ["restaurant-menu", restaurantId],
    queryFn: () => menuService.getRestaurantMenu(restaurantId!),
    enabled: !!restaurantId,
  });
