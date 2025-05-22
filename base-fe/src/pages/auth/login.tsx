import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Form, Input, Button, Typography, message } from "antd";
import type { FormValues } from "@/types/auth/auth";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

const { Text } = Typography;

export default function Login() {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  
  const loginMutation = useAuth({ resource: "login" });

  const onSubmit = (data: FormValues) => {
    loginMutation.mutate(data);
  };
     

  return (
    <Row justify="center" style={{ height: "100vh", alignItems: "center" }}>
      <Col span={8}>
        <h1 style={{ textAlign: "center", color: "blue", fontSize: "24px", fontWeight: "bold" }}>
          Đăng nhập
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
                  message: "Mật khẩu phải có ít nhất 6 ký tự!",
                },
              }}
              render={({ field }) => <Input.Password {...field} />}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loginMutation.isLoading}>
            {loginMutation.isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Link to="/forgot-password">Quên mật khẩu?</Link>
        </div>

        <div style={{ textAlign: "center", marginTop: "8px" }}>
          <Text>Chưa có tài khoản? </Text>
          <Link to="/register">Đăng ký ngay</Link>
        </div>
      </Col>
    </Row>
  );
}
