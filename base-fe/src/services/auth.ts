import instanceAxios from "@/utils/axios";

export const authService = {
  login: async (data: { email: string; password: string }) => {
    // Gọi đúng endpoint json-server
    const res = await instanceAxios.post(`/auth/login`);
    const users = res.data;
    if (!users.length) throw new Error("Email không tồn tại!");
    const user = users[0];
    if (user.password !== data.password) throw new Error("Mật khẩu không đúng!");
    // Trả về dữ liệu giống backend thật
    return { token: "dummy-token", user };
  },
};