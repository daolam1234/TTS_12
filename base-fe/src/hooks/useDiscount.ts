import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  type Discount,
  getDiscounts,
  createDiscount,
  deleteDiscount,
  updateDiscount,
  getDiscountById
} from "@/services/discountService";

// Lấy danh sách
export const useDiscountList = () =>
  useQuery<Discount[]>({
    queryKey: ["discounts"],
    queryFn: getDiscounts,
  });
  export const useDiscountDetail = (id: string) =>
    useQuery<Discount>({
      queryKey: ["discounts", id],
      queryFn: () => getDiscountById(id),
      enabled: !!id,
    });
// Tạo mới
export const useCreateDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      code: string;
      discount_percent: number;
      start_date: string;
      end_date: string;
      is_unlimited: boolean;
      max_uses: number;
    }) => createDiscount(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts"] });
    },
  });
};

// Xoá
export const useDeleteDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteDiscount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts"] });
    },
  });
};

// Cập nhật
export const useUpdateDiscount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<Omit<Discount, "_id" | "createdAt" | "updatedAt">>;
    }) => updateDiscount(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["discounts"] });
    },
  });
};
