import { useQuery } from "@tanstack/react-query";
import { restaurantService } from "../services";

export const useRestaurants = (search?: string) =>
  useQuery({
    queryKey: ["restaurants", search],
    queryFn: () => restaurantService.getRestaurants(search),
  });
