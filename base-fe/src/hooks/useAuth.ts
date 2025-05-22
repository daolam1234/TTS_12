import { auth } from "@/providers";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Props = {
  resource: "login" | "register";
};

export const useAuth = ({ resource }: Props) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: any) => auth({ resource, values }),

    onSuccess: (data) => {
      if (resource === "register") {
        toast.success("Đăng ký thành công!");
        navigate("/auth/login");
        return;
      }

      // Đăng nhập
      const { accessToken, user } = data;
      const { password, ...userWithoutPassword } = user;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      localStorage.setItem("role", user.role ?? "user");

      toast.success("Đăng nhập thành công!");
      navigate("/admin/dashboard");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Thao tác thất bại. Vui lòng thử lại!");
    },
  });
};
