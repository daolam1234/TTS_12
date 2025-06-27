import instanceAxios from "@/utils/axios";

export const attributeService = {
    getAll: async () => {
      const res = await instanceAxios.get('/attributes'); // ✅ URL đúng nếu backend cung cấp ở đây
      return res.data.data || [];
    },
  };