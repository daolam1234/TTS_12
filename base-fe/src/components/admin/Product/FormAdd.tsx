import { Form, Input, InputNumber, Select, Button, message, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCreateProduct } from "@/hooks/useProducts";
import type { ProductFormValues } from "@/types/product/product";
import { useState } from "react";
import type { UploadFile } from "antd/es/upload/interface";
import dayjs from "dayjs";
import { useList as useCategoryList } from "@/hooks/useCategory";

const { Option } = Select;

const AddProduct: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateProduct();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { data: categories = [], isLoading: loadingCategories } = useCategoryList({ resource: "categories" });

  const onFinish = (values: ProductFormValues) => {
    // Lấy url ảnh đầu tiên (nếu có)
    const imageUrl = fileList[0]?.url || fileList[0]?.thumbUrl || "";
    // Thêm ngày tạo (createdAt) khi tạo thành công
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
      }
    );
  };

  // Xử lý khi upload ảnh (chỉ lấy ảnh local, không upload lên server)
  const handleChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
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
            <Button type="primary" htmlType="submit" loading={isPending}>
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
