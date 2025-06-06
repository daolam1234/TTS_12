import React, { useState } from "react";
import { Table, Input, Select, Button, Space, Modal, message } from "antd";
import { Link } from "react-router-dom";
import type { Product } from "@/types/product/product";

const { Option } = Select;
const itemsPerPage = 5;

// Định nghĩa type cho sản phẩm

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Sản phẩm 1",
    description: "Mô tả sản phẩm",
    price: "10.000đ",
    category: "Áo",
    status: "còn hàng",
    stock: 30,
    date: "20/3/2025",
    image: "../assets/img/team-2.jpg",
    isDeleted: false,
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    description: "Mô tả khác",
    price: "15.000đ",
    category: "Quần",
    status: "hết hàng",
    stock: 0,
    date: "18/4/2025",
    image: "../assets/img/team-3.jpg",
    isDeleted: false,
  },
  // ... các sản phẩm khác
];

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products
    .filter((product) => !product.isDeleted)
    .filter((product) => {
      const matchesName = product.name.toLowerCase().includes(searchName.toLowerCase());
      const matchesCategory = selectedCategory === "" || product.category === selectedCategory;
      return matchesName && matchesCategory;
    });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const confirmDelete = (id: number, name: string) => {
    Modal.confirm({
      title: "Xác nhận xóa sản phẩm",
      content: `Bạn có chắc chắn muốn xóa "${name}"?`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        setProducts((prev) =>
          prev.map((product) =>
            product.id === id ? { ...product, isDeleted: true } : product
          )
        );
        message.success("Đã xóa sản phẩm thành công");
      },
    });
  };

  const columns = [
    {
      title: "ID",
      key: "index",
      render: (_: unknown, __: Product, index: number) =>
        (currentPage - 1) * itemsPerPage + index + 1,
      width: 60,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (img: string) => (
        <img
          src={img}
          alt="product"
          style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%" }}
        />
      ),
      width: 70,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 200,
      render: (name: string) => <strong>{name}</strong>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: 100,
      render: (description: string) => (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title={description}
        >
          {description}
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
      dataIndex: "date",
      key: "date",
      align: "center" as const,
      width: 140,
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center" as const,
      width: 180,
      render: (_: unknown, record: Product) => (
        <Space size="middle">
          <Link to={`/admin/products/details/${record.id}`} className="text-yellow-600 hover:underline">
            <i className="fas fa-eye mr-1" /> Xem
          </Link>
          <Button type="link" danger onClick={() => confirmDelete(record.id, record.name)}>
            <i className="far fa-trash-alt mr-1" /> Xóa mềm
          </Button>
          <Link to={`/admin/products/edit/${record.id}`} className="text-blue-600 hover:underline">
            <i className="fas fa-pencil-alt mr-1" /> Sửa
          </Link>
        </Space>
      ),
    },
  ];

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
        </Select>
      </div>

      <Table<Product>
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
