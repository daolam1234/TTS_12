// src/services/shippingMethodService.ts

import instanceAxios from "@/utils/axios";

export const shippingMethodService = {
  getAll: async (params?: Record<string, any>) => {
    const res = await instanceAxios.get("/shipping-method", { params });
    return res.data?.data || [];
  },
};
