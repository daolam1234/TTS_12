import { Form, Input, InputNumber, Select, Upload, Button, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

function FormAddSanPham() {
  const [form] = Form.useForm();

  const onFinish = (values:any) => {
    console.log('Form values:', values);
    
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <Card title="Thêm mới sản phẩm" bordered={false} className="shadow-xl rounded-2xl">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
        
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
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
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
              Thêm mới sản phẩm
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default FormAddSanPham;
