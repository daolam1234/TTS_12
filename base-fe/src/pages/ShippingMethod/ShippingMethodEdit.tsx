import { useShippingMethodDetail, useUpdateShippingMethod } from "@/hooks/useShippingMethod";
import { Card, Input, InputNumber, Select, Button, Form as AntForm, Spin } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import React from "react";

// Type cho form value
interface FormValues {
  name: string;
  carrier: string;
  fee: number;
  estimated_days: number;
  status: "active" | "inactive";
}

export const ShippingMethodEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // React Hook Form
  const { handleSubmit, control, reset } = useForm<FormValues>();

  // API hooks
  const { data: shippingMethod, isLoading: isFetching } = useShippingMethodDetail(id!);
  const { mutate, isLoading: isUpdating } = useUpdateShippingMethod();

  // Khi có data, reset form
  React.useEffect(() => {
    if (shippingMethod) {
      reset({
        name: shippingMethod.name || "",
        carrier: shippingMethod.carrier || "",
        fee: shippingMethod.fee || 0,
        estimated_days: shippingMethod.estimated_days || 1,
        status: shippingMethod.status || "active"
      });
    }
  }, [shippingMethod, reset]);

  const onSubmit = (data: FormValues) => {
    mutate({ id: id!, data }, { onSuccess: () => navigate(-1) });
  };

  if (isFetching) {
    return <Spin tip="Đang tải dữ liệu..." />;
  }

  return (
    <Card title="Chỉnh sửa phương thức vận chuyển">
      <AntForm layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <AntForm.Item label="Tên phương thức">
          <Controller
            name="name"
            control={control}
            rules={{ required: "Vui lòng nhập tên phương thức" }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} />
                {fieldState.error && (
                  <div style={{ color: "red" }}>{fieldState.error.message}</div>
                )}
              </>
            )}
          />
        </AntForm.Item>

        <AntForm.Item label="Hãng vận chuyển">
          <Controller
            name="carrier"
            control={control}
            rules={{ required: "Vui lòng nhập hãng vận chuyển" }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} />
                {fieldState.error && (
                  <div style={{ color: "red" }}>{fieldState.error.message}</div>
                )}
              </>
            )}
          />
        </AntForm.Item>

        <AntForm.Item label="Phí vận chuyển">
          <Controller
            name="fee"
            control={control}
            rules={{ required: "Vui lòng nhập phí vận chuyển" }}
            render={({ field, fieldState }) => (
              <>
                <InputNumber {...field} min={0} style={{ width: "100%" }} />
                {fieldState.error && (
                  <div style={{ color: "red" }}>{fieldState.error.message}</div>
                )}
              </>
            )}
          />
        </AntForm.Item>

        <AntForm.Item label="Thời gian dự kiến (ngày)">
          <Controller
            name="estimated_days"
            control={control}
            rules={{ required: "Vui lòng nhập thời gian dự kiến" }}
            render={({ field, fieldState }) => (
              <>
                <InputNumber {...field} min={1} style={{ width: "100%" }} />
                {fieldState.error && (
                  <div style={{ color: "red" }}>{fieldState.error.message}</div>
                )}
              </>
            )}
          />
        </AntForm.Item>

        <AntForm.Item label="Trạng thái">
          <Controller
            name="status"
            control={control}
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
        </AntForm.Item>

        <Button type="primary" htmlType="submit" loading={isUpdating}>
          Cập nhật
        </Button>
      </AntForm>
    </Card>
  );
};
