import {
  createBanner,
  getBanners,
  getBannerById,
  updateBanner,
  softDeleteBanner,
} from "@/services/banner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
  });
};

export const useOneBanner = ({ id }: { id?: string }) => {
  return useQuery({
    queryKey: ["banners", id],
    queryFn: () => getBannerById(id as string),
    enabled: !!id,
  });
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBanner,
    onSuccess: () => {
      message.success("Thêm banner thành công!");
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
    onError: () => message.error("Thêm banner thất bại!"),
  });
};

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBanner,
    onSuccess: () => {
      message.success("Cập nhật banner thành công!");
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
    onError: () => message.error("Cập nhật banner thất bại!"),
  });
};

export const useSoftDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: softDeleteBanner,
    onSuccess: () => {
      message.success("Đã xoá banner!");
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
    onError: () => message.error("Xoá banner thất bại!"),
  });
};
