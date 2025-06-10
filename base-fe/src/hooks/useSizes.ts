import {
  createSize,
  getSizes,
  getSizeById,
  updateSize,
  softDeleteSize,
} from "@/services/Size";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

// Danh sách
export const useSizes = () => {
  return useQuery({
    queryKey: ["sizes"],
    queryFn: getSizes,
  });
};

// 1 size
export const useOneSize = ({ id }: { id?: string }) => {
  return useQuery({
    queryKey: ["sizes", id],
    queryFn: () => getSizeById(id as string),
    enabled: !!id,
  });
};

// Thêm
export const useCreateSize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSize,
    onSuccess: () => {
      message.success("Thêm kích cỡ thành công!");
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
    },
    onError: () => {
      message.error("Thêm kích cỡ thất bại!");
    },
  });
};

// Cập nhật
export const useUpdateSize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSize,
    onSuccess: () => {
      message.success("Cập nhật kích cỡ thành công!");
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
    },
    onError: () => {
      message.error("Cập nhật kích cỡ thất bại!");
    },
  });
};

// Xoá mềm
export const useSoftDeleteSize = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: softDeleteSize,
    onSuccess: () => {
      message.success("Đã xoá kích cỡ thành công!");
      queryClient.invalidateQueries({ queryKey: ["sizes"] });
    },
    onError: () => {
      message.error("Xoá kích cỡ thất bại!");
    },
  });
};
