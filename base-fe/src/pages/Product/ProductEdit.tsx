import React from "react";


import {
  Button, Form, Input, InputNumber, Select, Upload, Card, Divider, message, Spin
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoryList } from "@/hooks/useCategory";
import { useProductDetail, useUpdateProduct } from "@/hooks/useProducts";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import type { UploadFile } from "antd/es/upload/interface";
import type { ProductFormValues } from "@/types/product/product";

const { TextArea } = Input;

export default function EditSanPham() {
  const { id } = useParams(); // product id từ url
  const navigate = useNavigate();
  const { data: categories = [] } = useCategoryList();
  const { data: product, isLoading } = useProductDetail(id || "");
  const { mutateAsync, isPending } = useUpdateProduct();

  const { control, handleSubmit, reset } = useForm<ProductFormValues>({
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      product_category_id: "",
      thumbnails: [] as UploadFile[],
      variants: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "variants",
  });

  // Khi product có dữ liệu thì set vào form
  React.useEffect(() => {
    if (product?.product) {
      console.log("✅ product from BE:", product.product);
      reset({
        title: product.product.title || "",
        price: product.product.price || 0,
        description: product.product.description || "",
        product_category_id: product.product.product_category_id?._id || product.product.product_category_id,
        thumbnails: (product.product.thumbnails || []).map((item: any, idx: number) => ({
          uid: idx.toString(),
          name: `Image ${idx}`,
          url: item.url,
          status: "done",
        })),
        variants: (product.product.variants || []).map((v: any) => ({
          _id: v._id,
          size: v.size,
          stock: v.stock,
        })),
      });
    }
  }, [product, reset]);
  console.log("product from BE:", product);

  const onSubmit = async (values: ProductFormValues) => {
    try {
      // Upload ảnh mới (nếu có)
      const thumbnails = await Promise.all(
        (values.thumbnails || []).map(async (file: UploadFile, idx: number) => {
          if (file.originFileObj) {
            const url = await uploadToCloudinary(file.originFileObj);
            return { url, position: idx };
          }
          if (file.url) {
            return { url: file.url, position: idx };
          }
          return null;
        })
      );
      const filteredThumbnails = thumbnails.filter((item) => !!item);

      // Chuẩn hoá variants, giữ lại _id nếu có
      const variants = (values.variants || []).map((v: any) => ({
        _id: v._id,
        size: v.size,
        stock: Number(v.stock),
      }));

      const payload = {
        title: values.title,
        price: Number(values.price),
        description: values.description,
        product_category_id: values.product_category_id,
        thumbnails: filteredThumbnails,
        variants,
        status: "active",
      };

      await mutateAsync({ id: id as string, data: payload });
      message.success("Cập nhật sản phẩm thành công!");
      navigate("/admin/products");
    } catch (err) {
      console.error("❌ Lỗi khi update:", err);
      message.error("Cập nhật thất bại");
    }
  };

  if (isLoading) {
    return <Spin tip="Đang tải dữ liệu sản phẩm..." />;
  }

  return (
    <div className="p-4">
      <Card title="Chỉnh sửa sản phẩm">
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
                    <Select.Option key={cat._id} value={cat._id}>
                      {cat.title}
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

          {fields.map((item, index) => (
            <Card
              key={item.id}
              type="inner"
              title={`Biến thể ${index + 1}`}
              extra={<Button danger onClick={() => remove(index)}>Xoá</Button>}
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
              onClick={() => append({ size: "", stock: 0 })}
              block
            >
              Thêm biến thể
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Cập nhật sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

