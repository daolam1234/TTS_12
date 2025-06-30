import React from "react";
import { Table, Button, Popconfirm, Tag, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useShippingMethodList, useDeleteShippingMethod } from "@/hooks/useShippingMethod";

const ShippingMethodListPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useShippingMethodList();
  const { mutate: deleteShippingMethod, isLoading: isDeleting } = useDeleteShippingMethod();

  const columns = [
    {
      title: "Tên phương thức",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hãng vận chuyển",
      dataIndex: "carrier",
      key: "carrier",
    },
    {
      title: "Phí (₫)",
      dataIndex: "fee",
      key: "fee",
      render: (fee: number) => fee.toLocaleString() + "₫",
    },
    {
      title: "Thời gian dự kiến (ngày)",
      dataIndex: "estimated_days",
      key: "estimated_days",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Hoạt động" : "Không hoạt động"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/shipping/edit/${record._id}`)}
          />
          <Popconfirm
            title="Bạn có chắc muốn xóa phương thức này?"
            onConfirm={() => deleteShippingMethod(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} loading={isDeleting} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Danh sách phương thức vận chuyển</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/shipping/add")}
        >
          Thêm phương thức
        </Button>
      </div>
      <Table
        rowKey="_id"
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ShippingMethodListPage;
