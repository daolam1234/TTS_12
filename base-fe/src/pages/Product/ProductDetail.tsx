import { useParams, useNavigate } from "react-router-dom";
import { useProductDetail } from "@/hooks/useProducts";
import { useDeleteVariant } from "@/hooks/useVariant";
import {
  Spin, Descriptions, Image, Tag, Divider, Typography, Table, Row, Col,
  Button, Space, Popconfirm, message
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export default function ProductDetailPage() {
  const { id: productId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useProductDetail(productId || "");
  const deleteVariantMutation = useDeleteVariant();

  if (isLoading) return <Spin />;
  if (error || !data?.product) return <div>Lỗi hoặc không tìm thấy sản phẩm</div>;

  const product = data.product;
  const relatedProducts = data.relatedProducts || [];

  const handleEditProduct = () => {
    navigate(`/admin/products/details/${productId}/edit`);
  };

  const handleAddVariant = () => {
    navigate(`/admin/products/details/${productId}/variants/add`);
  };

  const handleEditVariant = (variantIndex: number) => {
    navigate(`/admin/products/details/${productId}/variants/${variantIndex}/edit`);
  };

  const handleDeleteVariant = (variantIndex: number) => {
    deleteVariantMutation.mutate(
      { productId: productId!, variantIndex: String(variantIndex) },
      {
        onSuccess: () => {
          message.success("Đã xoá biến thể thành công");
          refetch(); // làm mới lại danh sách
        },
        onError: () => {
          message.error("Xoá biến thể thất bại");
        },
      }
    );
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      {/* Thanh điều hướng */}
      <div className="flex justify-between items-center mb-4">
        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          Quay lại
        </Button>
        <Space>
          <Button type="primary" icon={<EditOutlined />} onClick={handleEditProduct}>
            Chỉnh sửa sản phẩm
          </Button>
        </Space>
      </div>

      <Title level={3} className="mb-6">{product.title}</Title>

      <Row gutter={24}>
        <Col xs={24} md={8}>
          <div className="flex flex-wrap gap-2">
            {product.thumbnails.map(thumb => (
              <Image key={thumb._id} src={thumb.url} width={120} />
            ))}
          </div>
        </Col>
        <Col xs={24} md={16}>
          <Descriptions bordered size="middle" column={1}>
            <Descriptions.Item label="Giá gốc">{product.price.toLocaleString()}₫</Descriptions.Item>
            <Descriptions.Item label="Giảm giá">
              {product.discountPercentage > 0 ? `${product.discountPercentage}%` : "Không giảm"}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian giảm giá">
              {product.discountStartDate && product.discountEndDate
                ? `${new Date(product.discountStartDate).toLocaleDateString()} → ${new Date(product.discountEndDate).toLocaleDateString()}`
                : "Không áp dụng"}
            </Descriptions.Item>
            <Descriptions.Item label="Danh mục">{product.product_category_id?.title || "---"}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={product.status === "active" ? "green" : "red"}>
                {product.status === "active" ? "Hiển thị" : "Ẩn"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Tồn kho">{product.stock}</Descriptions.Item>
            <Descriptions.Item label="Mô tả">{product.description || "(Không có)"}</Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">{new Date(product.updatedAt).toLocaleString()}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      {/* Biến thể */}
      <div className="flex justify-between items-center mt-8 mb-4">
        <Title level={4} className="!mb-0">Biến thể sản phẩm</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddVariant}>
          Thêm biến thể
        </Button>
      </div>

      <Table
        dataSource={product.variants}
        rowKey={(_, index) => String(index)}
        bordered
        pagination={false}
        columns={[
          { title: "Size", dataIndex: "size", key: "size", width: "30%" },
          { title: "Tồn kho", dataIndex: "stock", key: "stock", width: "30%" },
          {
            title: "Hành động",
            key: "actions",
            render: (_, _record, index) => (
              <Space>
                <Button type="link" icon={<EditOutlined />} onClick={() => handleEditVariant(index)}>
                  Sửa
                </Button>
                <Popconfirm
                  title="Bạn có chắc muốn xoá biến thể này?"
                  onConfirm={() => handleDeleteVariant(index)}
                  okText="Xoá"
                  cancelText="Huỷ"
                >
                  <Button danger type="link" icon={<DeleteOutlined />} loading={deleteVariantMutation.isLoading}>
                    Xoá
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      <div className="flex justify-center mt-4">
        <Button type="dashed" icon={<PlusOutlined />} onClick={handleAddVariant}>
          Thêm biến thể mới
        </Button>
      </div>

      <Divider orientation="left" className="mt-10">Sản phẩm liên quan</Divider>
      <Row gutter={[16, 16]}>
        {relatedProducts.map(item => (
          <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
            <div className="border rounded shadow-sm p-3 bg-gray-50 h-full">
              <Image src={item.thumbnails[0]?.url} width="100%" height={160} style={{ objectFit: "cover", borderRadius: 8 }} />
              <Title level={5} className="mt-3">{item.title}</Title>
              <Text strong>Giá: </Text>{item.price.toLocaleString()}₫<br />
              <Text type="secondary">{item.variants.map(v => `${v.size} (${v.stock})`).join(", ")}</Text>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
