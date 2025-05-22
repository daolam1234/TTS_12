import { Table } from "antd";

const columns = [
  { title: "ID", dataIndex: "id" },
  { title: "ẢNH", dataIndex: "image" },
  { title: "MÔ TẢ", dataIndex: "description" },
  { title: "GIÁ", dataIndex: "price" },
  { title: "DANH MỤC", dataIndex: "category" },
  { title: "TRẠNG THÁI", dataIndex: "status" },
  { title: "KHO", dataIndex: "stock" },
  { title: "NGÀY TẠO", dataIndex: "createdAt" },
  { title: "THAO TÁC", dataIndex: "action" },
];

const data = [
  {
    id: 1,
    image: "🖼",
    description: "Sản phẩm A",
    price: "$100",
    category: "Điện tử",
    status: "Còn hàng",
    stock: 50,
    createdAt: "2025-01-01",
    action: "✏️ 🗑️",
  },
];

export default function ProductTable() {
  return <Table columns={columns} dataSource={data} pagination={false} bordered />;
}
