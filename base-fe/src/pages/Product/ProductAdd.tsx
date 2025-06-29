import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Card,
  Divider,
  message,
  type UploadFile,
} from "antd";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCategoryList } from "@/hooks/useCategory";
import { useCreateProduct } from "@/hooks/useProducts";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import type { ProductFormValues } from "@/types/product/product";

const { TextArea } = Input;

export default function ProductAddForm() {
  const { data: categories = [] } = useCategoryList();
  const { mutateAsync, isPending } = useCreateProduct();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<ProductFormValues>({
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      product_category_id: "",
      thumbnails: [] as UploadFile[],
      variants: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const onSubmit = async (values: ProductFormValues) => {
    try {
      console.log("✅ values:", values);

      // Upload ảnh chính và chuẩn hoá thành object
      const thumbnails = await Promise.all(
        (values.thumbnails || []).map(async (file: UploadFile, idx: number) => {
          if (file.originFileObj) {
            const url = await uploadToCloudinary(file.originFileObj);
            return {
              url,
              position: idx,
            };
          }
          // Nếu đã có url thì trả về object, KHÔNG trả về string!
          if (file.url) {
            return {
              url: file.url,
              position: idx,
            };
          }
          return null;
        })
      );
      const filteredThumbnails = thumbnails.filter((item) => !!item);
      // Chuẩn hoá variants
      const variants = (values.variants || []).map((variant: any) => ({
        size: variant.size,
        stock: Number(variant.stock),
      }));

      const payload = {
        title: values.title,
        price: Number(values.price),
        description: values.description,
        product_category_id: values.product_category_id,
        thumbnails: filteredThumbnails, // ✅ Luôn là array object đúng format
        variants,
        status: "active", // Thêm dòng này
      };

      if (filteredThumbnails.length === 0) {
        message.error("Vui lòng thêm ít nhất 1 ảnh sản phẩm");
        return;
      }
      console.log("Thumbnails:", filteredThumbnails);
      console.log("Payload:", payload);
      console.log("🧾 Payload cuối:", JSON.stringify(payload, null, 2));

      await mutateAsync(payload);
      message.success("Thêm sản phẩm thành công!");
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Lỗi khi thêm sản phẩm:", err);
      message.error("Thêm sản phẩm thất bại");
    }
  };

  return (
    <div className="p-4">
      <Card title="Thêm sản phẩm mới">
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item label="Tên sản phẩm" required>
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>

          <Form.Item label="Giá sản phẩm gốc" required>
            <Controller
              control={control}
              name="price"
              rules={{ required: true }}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  min={0}
                  className="w-full"
                  onChange={(value) => field.onChange(Number(value))}
                />
              )}
            />
          </Form.Item>

          <Form.Item label="Danh mục" required>
            <Controller
              control={control}
              name="product_category_id"
              rules={{ required: true }}
              render={({ field }) => (
                <Select {...field} placeholder="Chọn danh mục">
                  {categories.map((cat: any) => (
                    <Select.Option
                      key={cat._doc?._id || cat._id}
                      value={cat._doc?._id || cat._id}
                    >
                      {cat._doc?.title || cat.title}
                    </Select.Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item label="Mô tả">
            <Controller
              control={control}
              name="description"
              render={({ field }) => <TextArea {...field} rows={3} />}
            />
          </Form.Item>

          <Form.Item label="Ảnh sản phẩm">
            <Controller
              control={control}
              name="thumbnails"
              render={({ field }) => (
                <Upload
                  multiple
                  listType="picture-card"
                  fileList={field.value}
                  beforeUpload={() => false}
                  onChange={({ fileList }) => field.onChange(fileList)}
                >
                  {field.value.length < 5 && "+ Upload"}
                </Upload>
              )}
            />
          </Form.Item>

          <Divider orientation="left">Biến thể</Divider>

          {fields.map((fieldVariant, index) => (
            <Card
              key={fieldVariant.id}
              type="inner"
              title={`Biến thể ${index + 1}`}
              extra={
                <Button danger onClick={() => remove(index)}>
                  Xoá
                </Button>
              }
              style={{ marginBottom: 16 }}
            >
              <Form.Item label="Size" required>
                <Controller
                  control={control}
                  name={`variants.${index}.size`}
                  rules={{ required: true }}
                  render={({ field }) => <Input {...field} />}
                />
              </Form.Item>

              <Form.Item label="Tồn kho" required>
                <Controller
                  control={control}
                  name={`variants.${index}.stock`}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      min={0}
                      className="w-full"
                      onChange={(value) => field.onChange(Number(value))}
                    />
                  )}
                />
              </Form.Item>
            </Card>
          ))}

          <Form.Item>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() =>
                append({
                  size: "",
                  stock: 0,
                })
              }
              block
            >
              Thêm biến thể
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Thêm sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
