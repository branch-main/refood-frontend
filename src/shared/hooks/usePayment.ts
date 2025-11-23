import { useQuery } from "@tanstack/react-query";
import { paymentService } from "../services";

export const usePayment = (id?: string) =>
  useQuery({
    queryKey: ["payment", id],
    queryFn: () => paymentService.getPayment(id!),
    enabled: !!id,
  });
