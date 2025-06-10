import React, { useState } from "react";
import { Table, Input, Select, Button, Space, Modal, Spin, Image, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { useList, useSoftDeleteProduct } from "@/hooks/useProducts";
import type { Product } from "@/types/product/product";

const { Option } = Select;
const itemsPerPage = 5;

const ProductTable: React.FC = () => {
  const { data: products = [], isLoading } = useList();
  const softDeleteMutation = useSoftDeleteProduct();

  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Lọc sản phẩm chưa xóa, theo tên, theo category
  const filteredProducts = products
    .filter((p: Product) => !p.isDeleted)
    .filter(
      (p: Product) =>
        (p.name ?? "").toLowerCase().includes(searchName.toLowerCase()) &&
        (selectedCategory === "" || p.category === selectedCategory)
    );

  // Phân trang client
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Xác nhận xóa mềm
  const confirmDelete = (id: number, name: string) => {
    Modal.confirm({
      title: "Xác nhận xóa sản phẩm",
      content: `Bạn có chắc chắn muốn xóa "${name}"?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        softDeleteMutation.mutate(id);
      },
    });
  };

  const columns = [
    {
      title: "ID",
      key: "index",
      render: (_: unknown, __: Product, index: number) => (currentPage - 1) * itemsPerPage + index + 1,
      width: 60,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (imageSrc: string) => <Image src={imageSrc} />,
      width: 160,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 60,
      render: (name: string) => <strong>{name}</strong>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 120,
      render: (desc: string) => (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: 100,
            fontSize: 13,
          }}
          title={desc}
        >
          {desc}
        </div>
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "center" as const,
      render: (price: string) => (
        <span style={{ fontWeight: "bold", color: "#3b82f6" }}>{price}</span>
      ),
      width: 100,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      align: "center" as const,
      width: 100,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      width: 120,
      render: (status: string) => (
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 9999,
            color: "white",
            backgroundColor: status === "còn hàng" ? "#22c55e" : "#9ca3af",
            fontWeight: "bold",
            textTransform: "uppercase",
            fontSize: 12,
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Kho",
      dataIndex: "stock",
      key: "stock",
      align: "center" as const,
      width: 80,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center" as const,
      width: 140,
    },
 {
  title: "Thao tác",
  key: "actions",
  align: "center" as const,
  width: 200,
  render: (_: unknown, record: Product) => (
    <Space>
      <Link to={`/admin/products/details/${record.id}`}>
        <Button type="default">Xem</Button>
      </Link>

      <Link to={`/admin/products/edit/${record.id}`}>
        <Button type="primary">Sửa</Button>
      </Link>

      <Popconfirm
        title="Bạn có chắc chắn muốn xóa?"
        onConfirm={() => confirmDelete(record.id, record.name)}
        okText="Xóa"
        cancelText="Hủy"
      >
        <Button danger>Xóa</Button>
      </Popconfirm>
    </Space>
  ),
}
  ];

  if (isLoading) return <Spin size="large" className="m-10" />;

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <Button type="primary">
          <Link to="/admin/products/add">Thêm sản phẩm</Link>
        </Button>

        <Input
          placeholder="Tìm theo tên sản phẩm..."
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setCurrentPage(1);
          }}
          style={{ width: 200 }}
          allowClear
        />

        <Select
          value={selectedCategory}
          onChange={(value) => {
            setSelectedCategory(value);
            setCurrentPage(1);
          }}
          style={{ width: 160 }}
          allowClear
          placeholder="Chọn danh mục"
        >
          <Option value="">Tất cả danh mục</Option>
          <Option value="Áo">Áo</Option>
          <Option value="Quần">Quần</Option>
          <Option value="Phụ kiện">Phụ kiện</Option>
          {/* Thêm danh mục khác nếu có */}
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={currentItems}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: filteredProducts.length,
          onChange: handlePageChange,
          showSizeChanger: false,
        }}
        rowKey="id"
      />
    </div>
  );
};

export default ProductTable;
