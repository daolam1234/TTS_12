import { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select, Button, message, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useOneProduct, useUpdateProduct } from "@/hooks/useProducts";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import type { ProductFormValues } from "@/types/product/product";
import type { UploadFile } from "antd/es/upload/interface";
import { useList as useCategoryList } from "@/hooks/useCategory";

const { Option } = Select;

const FormeditSanPham: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useOneProduct({ id });
  const { mutate, isPending } = useUpdateProduct();
  const [uploading, setUploading] = useState(false);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { data: categories = [], isLoading: loading } = useCategoryList({ resource: "categories" });

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        status: product.status,
        stock: product.stock,
      });

      if (product.image) {
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            url: product.image,
            status: "done",
            type: "image/png",
          } as UploadFile,
        ]);
      }
    }
  }, [product, form]);

  const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList.slice(-1)); // chỉ giữ lại 1 ảnh
  };

  const onFinish = async (values: ProductFormValues) => {
    let imageUrl = product?.image || "";

    // Nếu có file ảnh mới và là local file, upload lên Cloudinary
    if (fileList.length > 0 && fileList[0].originFileObj) {
      try {
        setUploading(true);
        imageUrl = await uploadToCloudinary(fileList[0].originFileObj as File);
      } catch (error) {
        message.error("Lỗi upload ảnh: " + (error as Error).message);
        setUploading(false);
        return;
      }
    }

    mutate(
      {
        id,
        values: {
          ...values,
          image: imageUrl,
        },
      },
      {
        onSuccess: () => {
          message.success("Cập nhật sản phẩm thành công");
          navigate("/admin/products");
        },
        onError: () => {
          message.error("Cập nhật sản phẩm thất bại, vui lòng thử lại");
        },
        onSettled: () => {
          setUploading(false);
        },
      }
    );
  };

  if (isLoading) return <div>Đang tải dữ liệu sản phẩm...</div>;

  return (
    <div className="p-6 bg-white rounded shadow max-w-3xl mx-auto">
      <h2 className="mb-6 text-xl font-semibold">Chỉnh sửa sản phẩm</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: "còn hàng",
          category: "",
          stock: 0,
        }}
      >
        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input placeholder="Nhập tên sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea rows={4} placeholder="Mô tả sản phẩm" />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => Number((value || "").replace(/,/g, ""))}
            placeholder="Nhập giá sản phẩm"
          />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="category"
          rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
        >
          <Select placeholder="Chọn danh mục" loading={loading}>
            {categories
              .filter((cat: { deleted?: boolean }) => !cat.deleted)
              .map((cat: { id: string; name: string }) => (
                <Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Trạng thái"
          name="status"
          rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}
        >
          <Select>
            <Option value="còn hàng">Còn hàng</Option>
            <Option value="hết hàng">Hết hàng</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Kho"
          name="stock"
          rules={[{ required: true, message: "Vui lòng nhập số lượng kho" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Ảnh sản phẩm"
          name="image"
          rules={[{ required: true, message: "Vui lòng chọn ảnh sản phẩm" }]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            fileList={fileList}
            onChange={handleChange}
            maxCount={1}
            accept="image/*"
          >
            {fileList.length < 1 && (
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={isPending || uploading}>
              Lưu thay đổi
            </Button>
            <Button onClick={() => navigate("/admin/products")}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormeditSanPham;
