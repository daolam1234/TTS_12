import React, { useEffect } from "react";
import { Button, Form, Input, Spin, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useOneSize, useUpdateSize } from "@/hooks/useSizes";

const { Option } = Select;

const FormEditSize = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { data: size, isLoading } = useOneSize({ id });
  const { mutate: updateSize, isPending } = useUpdateSize();

  useEffect(() => {
    if (size) {
      form.setFieldsValue({
        name: size.name,
        description: size.description,
        status: size.status,
      });
    }
  }, [size, form]);

  const onFinish = (values: { name: string; description?: string; status: string }) => {
    if (!id) return;
    updateSize(
      { id, values },
      {
        onSuccess: () => {
          navigate("/admin/size");
        },
      }
    );
  };

  if (isLoading || !size) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ width: "100%", maxWidth: 700, marginTop: 24 }}
      >
        <Form.Item
          label="Tên kích thước"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên kích thước!" }]}
        >
          <Input placeholder="VD: M, L, XL..." />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
        >
          <Input placeholder="Nhập mô tả (nếu có)" />
        </Form.Item>

        <Form.Item
          label="Trạng thái hoạt động"
          name="status"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
        >
          <Select placeholder="Chọn trạng thái">
            <Option value="active">Hoạt động</Option>
            <Option value="inactive">Không hoạt động</Option>
          </Select>
        </Form.Item>

        <Form.Item className="text-right">
          <Button
            htmlType="submit"
            type="primary"
            loading={isPending}
            style={{ backgroundColor: "#007BFF", color: "white" }}
          >
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormEditSize;
