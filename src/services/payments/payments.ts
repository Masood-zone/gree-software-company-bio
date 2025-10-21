import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  PaymentInitRequest,
  PaymentInitResponse,
} from "@/types/enrollment";
import api from "../api";

export const processPayment = async (
  data: PaymentInitRequest
): Promise<PaymentInitResponse> => {
  const response = await api.post(`/api/payment/initialize`, data);
  return response.data as PaymentInitResponse;
};

export const useProcessPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: processPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

export const useVerifyPayment = () =>
  useMutation({
    mutationFn: async (reference: string) => {
      const response = await api.post(`/api/payment/verify`, { reference });
      return response.data as { success: boolean };
    },
  });
