import { useQuery } from "@tanstack/react-query";
import { menuItemService } from "../services";

export const useMenuItems = () =>
  useQuery({
    queryKey: ["menu-items"],
    queryFn: () => menuItemService.getMenuItems(),
  });
