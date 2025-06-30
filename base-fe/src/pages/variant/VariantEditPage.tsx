import { useParams, useNavigate } from "react-router-dom";
import { useVariantDetail, useEditVariant } from "@/hooks/useVariant";
import { Form as AntForm, Input, InputNumber, Button, Card, Spin } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";

interface FormValues {
  size: string;
  stock: number;
}

export default function ProductVariantEditPage() {
  const { id: productId, variantIndex } = useParams<{ id: string; variantIndex: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useVariantDetail(productId!, variantIndex!);
  const editMutation = useEditVariant();

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: { size: "", stock: 0 },
  });

  // Fill dữ liệu cũ vào form
  useEffect(() => {
    if (data) {
      reset({ size: data.size, stock: data.stock });
    }
  }, [data, reset]);

  const onSubmit = (values: FormValues) => {
    if (!productId || !variantIndex) return;
    editMutation.mutate(
      {
        productId,
        variantIndex: Number(variantIndex),
        data: values,
      },
      {
        onSuccess: () => navigate(-1),
      }
    );
  };

  if (isLoading) return <Spin />;

  return (
    <Card title="Chỉnh sửa biến thể">
      <AntForm layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <AntForm.Item label="Size" required>
          <Controller
            name="size"
            control={control}
            rules={{ required: "Nhập size" }}
            render={({ field, fieldState }) => (
              <>
                <Input {...field} placeholder="Size (vd: 38)" />
                {fieldState.error && (
                  <span style={{ color: "red" }}>{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </AntForm.Item>

        <AntForm.Item label="Số lượng" required>
          <Controller
            name="stock"
            control={control}
            rules={{ required: "Nhập số lượng" }}
            render={({ field, fieldState }) => (
              <>
                <InputNumber {...field} min={0} placeholder="Số lượng tồn kho" style={{ width: "100%" }} />
                {fieldState.error && (
                  <span style={{ color: "red" }}>{fieldState.error.message}</span>
                )}
              </>
            )}
          />
        </AntForm.Item>

        <Button type="primary" htmlType="submit" loading={editMutation.isLoading}>
          Cập nhật biến thể
        </Button>
      </AntForm>
    </Card>
  );
}
