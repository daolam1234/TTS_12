import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, InputNumber, Select, Upload, Button, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// Dữ liệu giả (thay bằng import nếu có file riêng)
const mockProducts = [
  {
    id: 1,
    name: 'Sản phẩm 1',
    price: 10000,
    size: 'm',
    category: 'clothing',
    image: [{ uid: '-1', name: 'team-2.jpg', url: '../assets/img/team-2.jpg' }],
  },
  // ... thêm các sản phẩm khác nếu cần
];

const { Option } = Select;

function FormeditSanPham() {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const product = mockProducts.find((p) => p.id === Number(id));
    if (product) {
      form.setFieldsValue({
        productName: product.name,
        price: product.price,
        size: product.size,
        category: product.category,
        image: product.image,
      });
    }
  }, [id, form]);

  const onFinish = (values: any) => {
    console.log('Updated values:', values);
    alert(`Đã cập nhật sản phẩm ID ${id}`);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <Card title="Cập nhật sản phẩm" bordered={false} className="shadow-xl rounded-2xl">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tên sản phẩm"
            name="productName"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item
            label="Giá sản phẩm"
            name="price"
            rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              step={1000}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              placeholder="Nhập giá sản phẩm"
            />
          </Form.Item>

          <Form.Item
            label="Kích cỡ"
            name="size"
            rules={[{ required: true, message: 'Vui lòng chọn kích cỡ!' }]}
          >
            <Select placeholder="Chọn kích cỡ">
              <Option value="s">S</Option>
              <Option value="m">M</Option>
              <Option value="l">L</Option>
              <Option value="xl">XL</Option>
              <Option value="xxl">XXL</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="category"
            rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
          >
            <Select placeholder="Chọn danh mục">
              <Option value="clothing">Quần áo</Option>
              <Option value="accessories">Phụ kiện</Option>
              <Option value="shoes">Giày dép</Option>
              <Option value="bags">Túi xách</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload name="image" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </Form.Item>

          <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default FormeditSanPham;
