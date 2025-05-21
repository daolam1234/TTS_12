import { useLogin } from '@/hooks/useLogin';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { Row, Col, Form, Input, Button, Typography, message } from 'antd';

const { Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const data = await loginMutation.mutateAsync(values);
      console.log('Đăng nhập thành công:', data);

      // Lưu token và role vào localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      // Điều hướng theo role
      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/home');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      message.error('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <Row justify="center" style={{ height: "100vh", alignItems: "center" }}>
      <Col span={8}>
        <h1 style={{ textAlign: "center", color: "blue", fontSize: "24px", fontWeight: "bold" }}>
          Đăng nhập
        </h1>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={loginMutation.isLoading}>
            {loginMutation.isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
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
