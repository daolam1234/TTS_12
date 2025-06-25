import { auth } from "@/providers";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  resource: "login";
};

export const useAuth = ({ resource }: Props) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: any) => auth({ resource, values }),
    onSuccess: (response) => {
      const { accessToken, account } = response.data;
      const role = account.admin ? "admin" : "user";
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(account));
      localStorage.setItem("role", role);
      localStorage.setItem("admin", account.admin ? "true" : "false");
      if (account.admin) {
        toast.success("Đăng nhập thành công!");
        navigate("/admin");

      } else {
        toast.error("Bạn không có quyền truy cập!");
        navigate("/auth/login");  

      }
    },


    onError: (error: any) => {
      toast.error(error?.message || "Thao tác thất bại. Vui lòng thử lại!");
    },
  });
};
