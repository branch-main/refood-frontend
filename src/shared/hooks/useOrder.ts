import { useQuery } from "@tanstack/react-query";
import { orderService } from "../services";

export const useOrder = (id?: string) =>
  useQuery({
    queryKey: ["order", id],
    queryFn: () => orderService.getOrder(id!),
    enabled: !!id,
  });
