import { productService } from "@/services/Product";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useProductList = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productService.getAll(params),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.create,
    onSuccess: (res) => {
      message.success(res?.message || "Thêm sản phẩm thành công");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      const serverError = error.response?.data;
      console.error("❌ Server response:", serverError);

      // Thêm log chi tiết errors
      if (serverError?.errors) {
        console.error("❌ Chi tiết lỗi:", serverError.errors);
      }

      if (Array.isArray(serverError?.errors)) {
        const messageStr = serverError.errors.join("\n");
        message.error(`Lỗi:\n${messageStr}`);
      } else if (typeof serverError?.errors === "object") {
        const messageStr = Object.entries(serverError.errors)
          .map(([field, errs]) => `- ${field}: ${(Array.isArray(errs) ? errs.join(", ") : errs)}`)
          .join("\n");
        message.error(`Lỗi:\n${messageStr}`);
      } else {
        message.error(serverError?.message || "Thêm sản phẩm thất bại");
      }
    },
  });
};

export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) throw new Error("Missing product ID");
      const res = await productService.getById(id);
      if (!res?.data?.product) throw new Error("Không tìm thấy sản phẩm");
      return res.data; // { product, relatedProducts }
    },
    enabled: !!id,
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.softDelete,
    onSuccess: (res) => {
      message.success(res?.message || "Đã xoá sản phẩm");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error:any) => {
      message.error("Xoá sản phẩm thất bại");
       console.error("❌ Server response:", error?.response?.data);
  console.error("❌ Chi tiết lỗi:", error?.response?.data?.errors);
    },
  });
};

export const useDeletedProducts = (page: number, limit = 10) => {
  return useQuery({
    queryKey: ["deleted-products", page],
    queryFn: () => productService.getDeletedProducts(page, limit),
    refetchOnWindowFocus: false,
  });
};
