// src/services/accountService.ts
import instanceAxios from "@/utils/axios";

export const accountService = {
  getAll: async (params?: Record<string, any>) => {
    const res = await instanceAxios.get("user/getUsers", { params });
    return res.data?.data || [];
  },
  softDelete: async (id: string) => {
    const res = await instanceAxios.delete(`/user/${id}`);
 
    return res.data?.data;
  },

  
};
