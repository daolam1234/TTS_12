import instanceAxios from "@/utils/axios";

export const authService = {
  login: async (data: { email: string; password: string }) => {
    const res = await instanceAxios.post(`/auth/login`, data);
    console.log(data);
    
    return res.data;
  },
};
