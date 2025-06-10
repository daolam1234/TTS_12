import { Table, Button, Popconfirm, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import type { Size } from "@/types/size/size";

interface SizeTableProps {
  sizes: Size[];
  onDelete: (id: string | number) => void;
}

const SizeTable: React.FC<SizeTableProps> = ({ sizes, onDelete }) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: unknown, __: Size, index: number) => index + 1,
    },
    {
      title: "Tên kích thước",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (desc: string) =>
        desc || <span style={{ color: "#aaa" }}>Không có</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        status === "active" ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Không hoạt động</Tag>
        ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ngày sửa cuối",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text: string) => dayjs(text).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_: unknown, record: Size) => (
        <Space>
          <Link to={`/admin/size/edit/${record.id}`}>
            <Button style={{ backgroundColor: "#007BFF", color: "white" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Bạn có chắc muốn xoá?"
            onConfirm={() => onDelete(record.id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <Button danger>Xoá</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        background: "white",
        padding: "16px",
        borderRadius: "12px",
        marginTop: "24px",
      }}
    >
      <Link to="/admin/size/add">
        <Button
          type="primary"
          style={{ backgroundColor: "#5A67D8", marginBottom: "12px" }}
        >
          Thêm kích cỡ
        </Button>
      </Link>

      <Table
        dataSource={sizes}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export default SizeTable;
