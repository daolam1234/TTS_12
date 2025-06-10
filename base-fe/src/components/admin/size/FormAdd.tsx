import React from "react";
import { Button, Form, Input } from "antd";

interface FormAddSizeProps {
  onSubmit: (values: { name: string }) => void;
  loading?: boolean;
}

const FormAddSize: React.FC<FormAddSizeProps> = ({ onSubmit, loading }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: { name: string }) => {
    onSubmit(values);
    form.resetFields(); // Optional: reset form sau khi thêm
  };

  return (
    <div className="min-h-screen flex justify-center">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        style={{ width: "100%", maxWidth: 700, marginTop: 24 }}
      >
        <Form.Item
          label="Tên kích thước"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên kích thước!" }]}
        >
          <Input placeholder="VD: S, M, L, XL..." />
        </Form.Item>

        <Form.Item className="text-right">
          <Button
            htmlType="submit"
            type="primary"
            loading={loading}
            style={{ backgroundColor: "#5A67D8", color: "white" }}
          >
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormAddSize;
