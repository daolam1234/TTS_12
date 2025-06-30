import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { shippingMethodService } from "@/services/shippingMethod";
import { message } from "antd";

// Lấy danh sách
export const useShippingMethodList = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["shipping-methods", params],
    queryFn: () => shippingMethodService.getAll(params),
  });
};

// Lấy chi tiết
export const useShippingMethodDetail = (id: string) => {
  return useQuery({
    queryKey: ["shipping-method", id],
    queryFn: () => shippingMethodService.getdetails(id),
    enabled: !!id,
  });
};

// Tạo mới
export const useCreateShippingMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: shippingMethodService.create,
    onSuccess: () => {
      message.success("Thêm phương thức vận chuyển thành công");
      queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
    },
    onError: () => {
      message.error("Thêm phương thức vận chuyển thất bại");
    },
  });
};

// Cập nhật
export const useUpdateShippingMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      shippingMethodService.update(id, data),
    onSuccess: () => {
      message.success("Cập nhật phương thức vận chuyển thành công");
      queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
    },
    onError: () => {
      message.error("Cập nhật phương thức vận chuyển thất bại");
    },
  });
};

// Xóa
export const useDeleteShippingMethod = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => shippingMethodService.delete(id),
    onSuccess: () => {
      message.success("Xóa phương thức vận chuyển thành công");
      queryClient.invalidateQueries({ queryKey: ["shipping-methods"] });
    },
    onError: () => {
      message.error("Xóa phương thức vận chuyển thất bại");
    },
  });
};
