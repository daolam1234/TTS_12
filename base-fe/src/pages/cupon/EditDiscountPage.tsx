import React, { useEffect } from "react";
import { Form, Input, DatePicker, Switch, InputNumber, Button, message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import dayjs from "dayjs";
import { useDiscountDetail, useUpdateDiscount } from "@/hooks/useDiscount";

const EditDiscountPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useDiscountDetail(id || "");
  const updateDiscount = useUpdateDiscount();

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        code: data.code,
        discount_percent: data.discount_percent,
        start_date: dayjs(data.start_date),
        end_date: dayjs(data.end_date),
        is_unlimited: data.is_unlimited,
        max_uses: data.max_uses,
      });
    }
  }, [data, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await updateDiscount.mutateAsync({
        id: id!,
        payload: {
          ...values,
          start_date: values.start_date.toISOString(),
          end_date: values.end_date.toISOString(),
        },
      });
      message.success("Cập nhật thành công");
      navigate("/admin/coupon");
    } catch {
      message.error("Cập nhật thất bại");
    }
  };

  if (isLoading) return <Spin />;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chỉnh sửa mã giảm giá</h2>
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
        <Button type="primary" onClick={handleSubmit} loading={updateDiscount.isPending}>
          Lưu
        </Button>
      </Form>
    </div>
  );
};

export default EditDiscountPage;
