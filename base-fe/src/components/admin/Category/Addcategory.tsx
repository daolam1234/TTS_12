import { Form, Input, Button } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

type Props = {
  onFinish: (values: any) => void;
  onCancel: () => void;
};

export default function AddCategoryForm({ onFinish, onCancel }: Props) {
  const [form] = Form.useForm();


  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
  
      createdAt: dayjs().format("YYYY-MM-DD"),
    };
    onFinish(formattedValues);
    form.resetFields();
   
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Tên danh mục"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
      >
        <Input />
      </Form.Item>

     <Form.Item label="Image" name="image" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

      <Form.Item>
        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}>Hủy</Button>
          <Button type="primary" htmlType="submit">
            Thêm mới
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
}
