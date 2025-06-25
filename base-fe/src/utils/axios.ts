import axios from "axios";
import { toast } from "react-toastify";


const instanceAxios = axios.create({
  baseURL: "http://localhost:8888/api",
  headers: {
    "Content-Type": "application/json"
  },
});

// ✅ Request Interceptor
instanceAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Axios v1+: headers là AxiosHeaders, không nên gán thẳng object
  if (token && config.headers) {
    config.headers.set?.("Authorization", `Bearer ${token}`);
  }

  return config;
}, (error) => Promise.reject(error));

// ✅ Handle lỗi
instanceAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error?.response?.data?.message || "Có lỗi xảy ra!");
    return Promise.reject(error);
  }
);

export default instanceAxios;
