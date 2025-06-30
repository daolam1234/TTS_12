import { addProductVariants, variantService } from "@/services/variant/variant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

// Thêm biến thể sản phẩm
export const useAddProductVariants = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, variants }: { productId: string; variants: { size: string; stock: number }[] }) =>
      addProductVariants(productId, variants),

    onSuccess: () => {
      message.success("Thêm biến thể thành công");
      // Sau khi thêm xong, refetch chi tiết sản phẩm để lấy variants mới
      queryClient.invalidateQueries({ queryKey: ["product-detail"] });
    },

    onError: () => {
      message.error("Thêm biến thể thất bại");
    },
  });
};
export const useVariantDetail = (productId: string, variantIndex: string) => {
    return useQuery({
      queryKey: ["variant-detail", productId, variantIndex],
      queryFn: () => variantService.getDetail(productId, variantIndex),
    });
  };

  export function useEditVariant() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ productId, variantIndex, data }: { productId: string; variantIndex: number; data: { size: string; stock: number } }) =>
        variantService.edit(productId, variantIndex, data),
      onSuccess: () => {
        message.success("Đã sửa biến thể thành công!");
        queryClient.invalidateQueries({ queryKey: ["product-detail"] });
      },
      onError: () => {
        message.error("Sửa biến thể thất bại!");
      },
    });
  }
  
  // Xoá biến thể
  export function useDeleteVariant() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ productId, variantIndex }: { productId: string; variantIndex: string }) =>
        variantService.delete(productId, variantIndex),
      onSuccess: (_, variables) => {
        message.success("Đã xoá biến thể thành công!");
        // invalidate đúng product detail theo id
        queryClient.invalidateQueries({ queryKey: ["product-detail", variables.productId] });
      },
      onError: () => {
        message.error("Xoá biến thể thất bại!");
      },
    });
  }