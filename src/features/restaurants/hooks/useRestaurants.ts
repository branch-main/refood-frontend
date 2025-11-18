import { useQuery } from "@tanstack/react-query";
import { restaurantService } from "../services";

export const useRestaurants = () =>
  useQuery({
    queryKey: ["restaurants"],
    queryFn: () => restaurantService.getRestaurants(),
  });
