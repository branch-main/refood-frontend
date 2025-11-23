import { useQuery } from "@tanstack/react-query";
import { orderService } from "../services";

export const useOrdersByCustomer = (customerId?: number) =>
  useQuery({
    queryKey: ["orders", customerId],
    queryFn: async () => {
      return orderService.getOrders(customerId!);
    },
    enabled: !!customerId,
  });
