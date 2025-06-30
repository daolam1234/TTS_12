import instanceAxios from "@/utils/axios";

export const shippingMethodService = {
  getAll: async (params?: Record<string, any>) => {
    const res = await instanceAxios.get("/shipping-methods", { params });
    return res.data?.data || [];
  },
  getdetails: async (id: string, params?: Record<string, any>) => {
    const res = await instanceAxios.get(`/shipping-methods/${id}`, { params });
    return res.data?.data || [];
  },

  getById: async (id: string) => {
    const res = await instanceAxios.get(`/shipping-methods/${id}`);
    return res.data?.data;
  },

  create: async (data: any) => {
    const res = await instanceAxios.post("/shipping-methods", data);
    return res.data;
  },


  update: async (id: string, data: any) => {
    const res = await instanceAxios.put(`/shipping-methods/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await instanceAxios.delete(`/shipping-methods/${id}`);
    return res.data;
  },
};
