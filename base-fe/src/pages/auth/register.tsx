import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Form, Input, Button, Typography } from "antd";
import { toast } from "react-toastify";
import type { FormValues } from "@/types/auth/auth";
import { useAuth } from "@/hooks/useAuth";

const { Text } = Typography;

export default function Register() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const registerMutation = useAuth({ resource: "register" });

  const password = watch("password");

  const onFinish = async (data: FormValues) => {
    const { confirmPassword, ...submitData } = data;
    try {
      await registerMutation.mutateAsync(submitData);
      // Thành công sẽ được xử lý trong useAuth
    } catch (error) {
      // Đã xử lý toast trong useAuth
    }
  };
  

  return (
    <Row justify="center" style={{ height: "100vh", alignItems: "center" }}>
      <Col span={8}>
        <h1 style={{ textAlign: "center", color: "green", fontSize: "24px", fontWeight: "bold" }}>
          Đăng ký tài khoản
        </h1>

        <Form layout="vertical" onFinish={handleSubmit(onFinish)}>
          <Form.Item
            label="Họ tên"
            validateStatus={errors.fullName ? "error" : ""}
            help={errors.fullName?.message}
          >
            <Controller
              name="fullName"
              control={control}
              rules={{
                required: "Vui lòng nhập họ tên!",
                maxLength: { value: 50, message: "Họ tên quá dài!" },
              }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

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
                minLength: { value: 6, message: "Mật khẩu ít nhất 6 ký tự!" },
                
              }}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            validateStatus={errors.confirmPassword ? "error" : ""}
            help={errors.confirmPassword?.message}
          >
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Vui lòng xác nhận mật khẩu!",
                validate: (value) => value === password || "Mật khẩu không khớp!",
              }}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={registerMutation.isLoading}>
            {registerMutation.isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Text>Đã có tài khoản? </Text>
          <Link to="/login">Đăng nhập</Link>
        </div>
      </Col>
    </Row>
  );
}
