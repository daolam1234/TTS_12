import { useParams } from "react-router-dom"
import { useProductDetail } from "@/hooks/useProducts"
import {
  Spin, Descriptions, Image, Tag, Divider,
  Typography, Table, Row, Col, Button, Space, Popconfirm, message
} from "antd"
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"

const { Title, Text } = Typography

export default function ProductDetailPage() {
  const { id } = useParams()
  const { data, isLoading, error } = useProductDetail(id || "")

  if (isLoading) return <Spin />
  if (error || !data?.product) return <div>Lỗi hoặc không tìm thấy sản phẩm</div>

  const product = data.product
  const relatedProducts = data.relatedProducts || []

  const handleEditVariant = (variant: any) => {
    message.info(`Sửa biến thể: size ${variant.size}`)
    // TODO: mở modal sửa
  }

  const handleDeleteVariant = (variantId: string) => {
    message.success(`Đã xoá biến thể: ${variantId}`)
    // TODO: gọi API xoá biến thể
  }

  const handleAddVariant = () => {
    message.info("Thêm biến thể mới")
    // TODO: mở modal thêm biến thể
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <Title level={3} className="mb-6">{product.title}</Title>

      {/* Layout ảnh trái - thông tin phải */}
      <Row gutter={24}>
        <Col xs={24} md={8}>
          <div className="flex flex-wrap gap-2">
            {product.thumbnails.map((thumb: any) => (
              <Image key={thumb._id} src={thumb.url} width={120} />
            ))}
          </div>
        </Col>

        <Col xs={24} md={16}>
          <Descriptions bordered size="middle" column={1}>
            <Descriptions.Item label="Giá gốc">
              {product.price.toLocaleString()}₫
            </Descriptions.Item>
            <Descriptions.Item label="Giảm giá">
              {product.discountPercentage > 0
                ? `${product.discountPercentage}%`
                : "Không giảm"}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian giảm giá">
              {product.discountStartDate && product.discountEndDate ? (
                <>
                  {new Date(product.discountStartDate).toLocaleDateString()} →{" "}
                  {new Date(product.discountEndDate).toLocaleDateString()}
                </>
              ) : (
                "Không áp dụng"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Danh mục">
              {product.product_category_id?.title || "---"}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              <Tag color={product.status === "active" ? "green" : "red"}>
                {product.status === "active" ? "Hiển thị" : "Ẩn"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Tồn kho">{product.stock}</Descriptions.Item>
            <Descriptions.Item label="Mô tả">
              {product.description || "(Không có)"}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày cập nhật">
              {new Date(product.updatedAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      {/* Biến thể dạng bảng */}
      <div className="flex justify-between items-center mt-8 mb-4">
        <Title level={4} className="!mb-0">Biến thể sản phẩm</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddVariant}>
          Thêm biến thể
        </Button>
      </div>

      <Table
        dataSource={product.variants}
        rowKey="_id"
        bordered
        pagination={false}
        columns={[
          { title: "Size", dataIndex: "size", key: "size", width: "25%" },
          { title: "Số lượng tồn kho", dataIndex: "stock", key: "stock", width: "25%" },
          {
            title: "Hành động",
            key: "actions",
            render: (_, record: any) => (
              <Space>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => handleEditVariant(record)}
                >
                  Sửa
                </Button>
                <Popconfirm
                  title="Bạn có chắc muốn xoá biến thể này?"
                  onConfirm={() => handleDeleteVariant(record._id)}
                  okText="Xoá"
                  cancelText="Huỷ"
                >
                  <Button danger type="link" icon={<DeleteOutlined />}>
                    Xoá
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      {/* Sản phẩm liên quan */}
      <Divider orientation="left" className="mt-10">Sản phẩm liên quan</Divider>
      <Row gutter={[16, 16]}>
        {relatedProducts.map((item: any) => (
          <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
            <div className="border rounded shadow-sm p-3 bg-gray-50 h-full">
              <Image
                src={item.thumbnails[0]?.url}
                width="100%"
                height={160}
                style={{ objectFit: "cover", borderRadius: 8 }}
              />
              <Title level={5} className="mt-3">{item.title}</Title>
              <Text strong>Giá: </Text>{item.price.toLocaleString()}₫<br />
              <Text type="secondary">
                {item.variants.map((v: any) => `${v.size} (${v.stock})`).join(", ")}
              </Text>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}
