import { useQuery } from "@tanstack/react-query";
import { menuService } from "../services";

export const useMenuOptions = (id?: number) =>
  useQuery({
    queryKey: ["menu-options"],
    queryFn: async () => {
      return menuService.getMenuOptions(id!);
    },
    enabled: !!id,
  });
