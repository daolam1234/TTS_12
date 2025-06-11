// src/hooks/useProducts.ts
import { createProduct, getProducts, softDeleteProduct, getProductById, updateProduct } from "@/services/Product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

// Lấy danh sách sản phẩm
export const useList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

// Lấy 1 sản phẩm theo id
export const useOneProduct = ({ id }: { id?: string }) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id as string), 
    enabled: !!id,
  });
};

// Tạo sản phẩm mới
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      message.error("Thêm sản phẩm thất bại!");
    },
  });
};

// Cập nhật sản phẩm
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      message.error("Cập nhật sản phẩm thất bại!");
    },
  });
};

// Xóa mềm sản phẩm
export const useSoftDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: softDeleteProduct,
    onSuccess: () => {
 
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      message.error("Xóa mềm thất bại");
    },
  });
};

