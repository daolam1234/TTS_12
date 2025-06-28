// src/hooks/useOrder.ts
import { orderService } from "@/services/order";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { message } from "antd";

export const useOrderList = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => orderService.getAll(params),
  });
};
export const useOrderDetail = (id?: string) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => orderService.getById(id!),
    enabled: !!id,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      orderService.updateStatus(id, status),
    onSuccess: (_, variables) => {
      message.success("Cập nhật trạng thái thành công");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
    },
    onError: () => {
      message.error("Cập nhật trạng thái thất bại");
    },
  });
};






