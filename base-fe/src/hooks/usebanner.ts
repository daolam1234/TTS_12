// src/hooks/useBanner.ts
import { bannerService } from "@/services/banner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";

export const useBannerList = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["banners", params],
    queryFn: () => bannerService.getAll(params),
  });
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bannerService.create,
    onSuccess: () => {
      message.success("Thêm banner thành công");
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
    onError: () => {
      message.error("Thêm banner thất bại");
    },
  });
};


export const useBannerDetail = (id) => {
  const { data: banners = [], isLoading } = useBannerList();
  const banner = banners.find((b) => b._id === id);
  return { data: banner, isLoading };
};

// Cập nhật banner
export const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: ({ id, data }: { id: string; data: FormData }) =>
          bannerService.update(id, data),
      onSuccess: () => {
          message.success("Cập nhật banner thành công!");
          queryClient.invalidateQueries({ queryKey: ["banners"] });
      },
      onError: (error: any) => {
          console.error("❌ Lỗi update banner:", error);
          message.error(error.response?.data?.error || "Cập nhật banner thất bại!");
      },
  });
};

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bannerService.delete,
    onSuccess: () => {
      message.success("Xóa banner thành công");
      queryClient.invalidateQueries({ queryKey: ["banners"] });
    },
    onError: () => {
      message.error("Xóa banner thất bại");
    },
  });
};
