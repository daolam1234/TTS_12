import { useAddProductVariants } from "@/hooks/useVariant";
import { Card, Form as AntForm, InputNumber, Input, Button, Typography, Space } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface FormValues {
  variants: { size: string; stock: number }[];
}

export const ProductVariantAddPage = () => {
  const { id: productId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: { variants: [{ size: "", stock: 0 }] },
  });

  const { mutate, isLoading } = useAddProductVariants();

  const onSubmit = (values: FormValues) => {
    if (!productId) return;
    mutate(
      { productId, variants: values.variants },
      { onSuccess: () => navigate(-1) }
    );
  };

  return (
    <Card
      title={
        <Space>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
          <span>Thêm biến thể sản phẩm</span>
        </Space>
      }
    >
      <Text type="secondary">
        Vui lòng nhập thông tin biến thể bên dưới
      </Text>

      <AntForm layout="vertical" onFinish={handleSubmit(onSubmit)} className="mt-4">
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Space direction="horizontal" size="middle" style={{ width: "100%" }}>
            <Controller
              name={`variants.0.size`}
              control={control}
              rules={{ required: "Nhập size" }}
              render={({ field }) => (
                <AntForm.Item label="Size" required style={{ flex: 1 }}>
                  <Input {...field} placeholder="Ví dụ: 38" />
                </AntForm.Item>
              )}
            />
            <Controller
              name={`variants.0.stock`}
              control={control}
              rules={{ required: "Nhập số lượng" }}
              render={({ field }) => (
                <AntForm.Item label="Số lượng" required style={{ flex: 1 }}>
                  <InputNumber {...field} placeholder="Số lượng" min={0} style={{ width: "100%" }} />
                </AntForm.Item>
              )}
            />
          </Space>

          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Lưu biến thể
          </Button>
        </Space>
      </AntForm>
    </Card>
  );
};
