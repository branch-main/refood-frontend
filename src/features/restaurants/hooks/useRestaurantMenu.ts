import { useQuery } from "@tanstack/react-query";
import { restaurantService } from "../services";

export const useRestaurantMenu = (id: number) =>
  useQuery({
    queryKey: ["restaurant-menu", id],
    queryFn: () => restaurantService.getRestaurantMenu(id),
  });
