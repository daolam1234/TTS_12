import instanceAxios from "@/utils/axios";

export const productService = {
  getAll: async (params?: Record<string, any>) => {
    const res = await instanceAxios.get("/products", { params });
    return res.data?.data || [];
  },

  getById: async (id: string) => {
    const res = await instanceAxios.get(`/products/${id}`);
    return res.data; // { success, data: { product }, message }
  },

  create: async (data: any) => {
    // Gửi JSON, không dùng FormData nếu không upload file
    const payload = {
      ...data,
      thumbnails: (data.thumbnails || []).map((item: any, i: number) => ({
        url: item.url,
        position: item.position ?? i,
      })),
      variants: (data.variants || []).map((v: any) => ({
        size: v.size,
        stock: Number(v.stock),
      })),
    };

    const res = await instanceAxios.post("/products", payload);
    return res.data;
  },
  update: async (id: string, data: any) => {
    const payload = {
      ...data,
      thumbnails: (data.thumbnails || []).map((item: any, i: number) => ({
        url: item.url,
        position: item.position ?? i,
      })),
      variants: (data.variants || []).map((v: any) => ({
        size: v.size,
        stock: Number(v.stock),
      })),
    };

    const res = await instanceAxios.put(`/products/${id}`, payload);
    return res.data;
  },



  softDelete: async (id: string) => {
    const res = await instanceAxios.delete(`/products/soft-delete/${id}`);
    return res.data;
  },

  getDeletedProducts: async (page = 1, limit = 10) => {
    const res = await instanceAxios.get(`/products/get-deleted`, {
      params: { page, limit },
    });
    return res.data?.data || [];
  },

  restore: async (id: string) => {
    const res = await instanceAxios.patch(`/products/restore/${id}`);
    return res.data;
  },
};
