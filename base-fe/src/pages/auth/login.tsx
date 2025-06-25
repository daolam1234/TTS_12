import { useForm, Controller } from "react-hook-form";
import { Row, Col, Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuthStore } from "@/stores/auth";
import { authService } from "@/services/auth";

const { Text } = Typography;

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      console.log("Dữ liệu gửi:", data); // ✅ Debug

      const res = await authService.login(data); // phải trả về { token, user }

      if (!res.user?.admin) {
        toast.error("Bạn không có quyền truy cập!");
        return;
      }

      login(res.token, res.user);
      toast.success("Đăng nhập thành công!");
      navigate("/admin");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.response?.data?.message || "Sai email hoặc mật khẩu!");
    }
  };

  return (
    <Row justify="center" style={{ height: "100vh", alignItems: "center" }}>
      <Col span={8}>
        <h1 style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
          Đăng nhập quản trị
        </h1>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Email"
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Vui lòng nhập email!",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email không hợp lệ!",
                },
              }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Vui lòng nhập mật khẩu!",
                minLength: {
                  value: 6,
                  message: "Ít nhất 6 ký tự!",
                },
              }}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
