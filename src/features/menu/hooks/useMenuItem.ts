import { useQuery } from "@tanstack/react-query";
import { menuItemService } from "../services";

export const useMenuItem = (id: number) =>
  useQuery({
    queryKey: ["menu-item", id],
    queryFn: () => menuItemService.getMenuItem(id),
  });
