import { useQuery } from "@tanstack/react-query";
import { menuService } from "../services";

export const useCategories = (restaurantId: number) => {
  return useQuery({
    queryKey: ["categories", restaurantId],
    queryFn: () => menuService.getCategories(restaurantId),
    enabled: !!restaurantId,
  });
};
