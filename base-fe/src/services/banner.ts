// src/services/bannerService.ts
import instanceAxios from "@/utils/axios";

export const bannerService = {
  getAll: async (params?: Record<string, any>) => {
    const res = await instanceAxios.get("/banners", { params });
    return res.data?.data || [];
  },
  getById: async (id: string) => {
    const res = await instanceAxios.get(`/banners/${id}`);
    return res.data?.data;
  },
  create: async (data: FormData) => {
    const res = await instanceAxios.post("/banners", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.data;
  },
  update: async (id: string, data: FormData) => {
    const res = await instanceAxios.patch(`/banners/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data?.data;
},
  delete: async (id: string) => {
    const res = await instanceAxios.delete(`/banners/${id}`);
    return res.data?.data;
  },
};
