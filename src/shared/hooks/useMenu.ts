import { useQuery } from "@tanstack/react-query";
import { menuService } from "../services";

export const useMenu = () =>
  useQuery({
    queryKey: ["menu-items"],
    queryFn: () => menuService.getMenu(),
  });
