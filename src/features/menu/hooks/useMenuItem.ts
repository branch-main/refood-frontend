import { useQuery } from "@tanstack/react-query";
import { menuService } from "../services";

export const useMenuItem = (id?: number) =>
  useQuery({
    queryKey: ["menu-item", id],
    queryFn: () => menuService.getMenuItem(id!),
    enabled: !!id,
  });
