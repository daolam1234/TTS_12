import React from "react";
import { Form, Input, DatePicker, Switch, InputNumber, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useCreateDiscount } from "@/hooks/useDiscount";

const AddDiscountPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const createDiscount = useCreateDiscount();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await createDiscount.mutateAsync({
        ...values,
        start_date: values.start_date.toISOString(),
        end_date: values.end_date.toISOString(),
      });
      message.success("Thêm thành công");
      navigate("/admin/coupon");
    } catch {
      message.error("Thêm thất bại");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Thêm mã giảm giá</h2>
      <Form form={form} layout="vertical">
        <Form.Item name="code" label="Mã" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="discount_percent" label="Giảm (%)" rules={[{ required: true }]}>
          <InputNumber min={1} max={100} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="start_date" label="Ngày bắt đầu" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="end_date" label="Ngày kết thúc" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="is_unlimited" label="Không giới hạn" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item name="max_uses" label="Số lần dùng tối đa" rules={[{ required: true }]}>
          <InputNumber min={1} style={{ width: "100%" }} />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit} loading={createDiscount.isPending}>
          Lưu
        </Button>
      </Form>
    </div>
  );
};

export default AddDiscountPage;
