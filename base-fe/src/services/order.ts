// src/services/orderService.ts
import instanceAxios from "@/utils/axios";

export const orderService = {
  
  getAll: async (params?: Record<string, any>) => {
    const res = await instanceAxios.get("/orders/get-all-order", { params });
    return res.data?.data || [];
  },  
  getById: async (id: string) => {
    const res = await instanceAxios.get(`/orders/${id}`);
    return res.data?.data;
  },
  updateStatus: async (id: string, status: string) => {
    const res = await instanceAxios.put(`/orders/${id}/status`, { status });
    return res.data?.data;
  },
};
