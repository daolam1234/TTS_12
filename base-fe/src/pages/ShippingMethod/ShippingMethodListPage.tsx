// src/pages/admin/shipping-method/ShippingMethodListPage.tsx

import React from "react";
import { Table, Tag, Button } from "antd";
import { useShippingMethodList } from "@/hooks/useShippingMethod";

const ShippingMethodListPage = () => {
  const { data, isLoading } = useShippingMethodList();

  const columns = [
    { title: "Tên phương thức", dataIndex: "name", key: "name" },
    { title: "Hãng vận chuyển", dataIndex: "carrier", key: "carrier" },
    { 
      title: "Phí (VND)", 
      dataIndex: "fee", 
      key: "fee",
      render: (value: number) => value.toLocaleString(),
    },
    { 
      title: "Ngày giao dự kiến",
      dataIndex: "estimated_days",
      key: "estimated_days",
      render: (value: number) => `${value} ngày`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        <Tag color={status === "active" ? "green" : "red"}>
          {status === "active" ? "Đang hoạt động" : "Ngừng"}
        </Tag>,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button type="link">Sửa</Button>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Danh sách phương thức vận chuyển</h2>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ShippingMethodListPage;
