import { useQuery } from "@tanstack/react-query";
import { menuService } from "../services";

export const useMenuByRestaurant = (restaurantId?: number) =>
  useQuery({
    queryKey: ["menu-by-restaurant", restaurantId],
    queryFn: () => menuService.getMenuByRestaurant(restaurantId!),
    enabled: !!restaurantId,
  });
