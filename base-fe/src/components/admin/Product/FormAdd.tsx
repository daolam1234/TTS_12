import { Form, Input, InputNumber, Select, Button, Space, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "@/hooks/useProducts";
import type { ProductFormValues } from "@/types/product/product";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";
import dayjs from "dayjs";
import { useList as useCategoryList } from "@/hooks/useCategory";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary"; // Đảm bảo bạn đã tạo hàm này

const { Option } = Select;

const AddProduct: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateProduct();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const { data: categories = [], isLoading: loadingCategories } = useCategoryList({ resource: "categories" });

  const onFinish = async (values: ProductFormValues) => {
    if (fileList.length === 0) {
      message.error("Vui lòng chọn ảnh sản phẩm");
      return;
    }

    setUploading(true);
    try {
      const file = fileList[0].originFileObj;
      if (!file) {
        message.error("Không tìm thấy file ảnh");
        setUploading(false);
        return;
      }

      // Upload ảnh lên Cloudinary
      const imageUrl = await uploadToCloudinary(file);

      const createdAt = dayjs().format("YYYY-MM-DD");

      mutate(
        { ...values, image: imageUrl, createdAt },
        {
          onSuccess: () => {
            message.success("Thêm sản phẩm thành công");
            navigate("/admin/products");
          },
          onError: () => {
            message.error("Thêm sản phẩm thất bại, vui lòng thử lại");
          },
          onSettled: () => {
            setUploading(false);
          },
        }
      );
    } catch (error) {
      message.error("Lỗi upload ảnh: " + (error as Error).message);
      setUploading(false);
    }
  };

  const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList.slice(-1));
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-3xl mx-auto">
      <h2 className="mb-6 text-xl font-semibold">Thêm sản phẩm mới</h2>

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
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => Number((value || "").replace(/,/g, ""))}
            placeholder="Nhập giá sản phẩm"
          />
        </Form.Item>

        <Form.Item
          label="Danh mục"
          name="category"
          rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
        >
          <Select placeholder="Chọn danh mục" loading={loadingCategories}>
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
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false} // Ngăn upload tự động
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
              Thêm sản phẩm
            </Button>
            <Button onClick={() => navigate("/admin/products")}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;
