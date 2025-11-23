import { useQuery } from "@tanstack/react-query";
import { paymentService } from "../services";

export const usePaymentByOrder = (id?: string) =>
  useQuery({
    queryKey: ["payment-by-order", id],
    queryFn: () => paymentService.getPaymentByOrder(id!),
    enabled: !!id,
  });
