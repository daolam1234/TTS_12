import type { BannerFormValues } from "@/types/banner/banner";
import instanceAxios from "@/utils/axios";

// Tạo banner mới
export const createBanner = async (values: BannerFormValues) => {
  const { data } = await instanceAxios.post("/banners", values);
  return data;
};

// Lấy danh sách banner
export const getBanners = async () => {
  const { data } = await instanceAxios.get("/banners");
  return data;
};

// Lấy 1 banner
export const getBannerById = async (id: string | number) => {
  const { data } = await instanceAxios.get(`/banners/${id}`);
  return data;
};

// Cập nhật banner
export const updateBanner = async ({ id, values }: { id: string | number, values: Partial<BannerFormValues> }) => {
  const { data } = await instanceAxios.patch(`/banners/${id}`, values);
  return data;
};

// Xoá mềm banner
export const softDeleteBanner = async (id: string | number) => {
  return updateBanner({ id, values: { isDeleted: true } });
};
