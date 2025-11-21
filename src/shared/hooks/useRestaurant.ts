import { useQuery } from "@tanstack/react-query";
import { restaurantService } from "../services";

export const useRestaurant = (id?: number) =>
  useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => restaurantService.getRestaurant(id!),
    enabled: !!id,
  });
