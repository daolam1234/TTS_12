import React from "react";
import { Form, Input, InputNumber, Button, Select, Card } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useCreateShippingMethod } from "@/hooks/useShippingMethod";
import { useNavigate } from "react-router-dom";

export const ShippingMethodCreatePage = () => {
  const { handleSubmit, control } = useForm();
  const { mutate, isLoading } = useCreateShippingMethod();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    mutate(data, { onSuccess: () => navigate(-1) });
  };

  return (
    <Card title="Thêm phương thức vận chuyển">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Tên phương thức">
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Hãng vận chuyển">
          <Controller
            name="carrier"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Phí vận chuyển">
          <Controller
            name="fee"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputNumber {...field} min={0} style={{ width: "100%" }} />
            )}
          />
        </Form.Item>

        <Form.Item label="Thời gian dự kiến (ngày)">
          <Controller
            name="estimated_days"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputNumber {...field} min={1} style={{ width: "100%" }} />
            )}
          />
        </Form.Item>

        <Form.Item label="Trạng thái">
          <Controller
            name="status"
            control={control}
            defaultValue="active"
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "active", label: "Hoạt động" },
                  { value: "inactive", label: "Không hoạt động" }
                ]}
              />
            )}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={isLoading}>
          Thêm
        </Button>
      </Form>
    </Card>
  );
};
