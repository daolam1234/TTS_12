import React from "react";
import { Table, Button, Tag, Space, Select, Tooltip, Spin } from "antd";
import { useOrderList, useUpdateOrderStatus } from "@/hooks/useOrder";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { EyeOutlined } from "@ant-design/icons";

const OrderListPage = () => {
  const { data: orders, isLoading } = useOrderList();
  const { mutate, isPending } = useUpdateOrderStatus();
  const navigate = useNavigate();

  const handleUpdateStatus = (id: string, status: string) => {
    mutate({ id, status });
  };

  const statusOptions = [
    { value: "pending", label: "Chờ xử lý" },
    { value: "confirmed", label: "Đã xác nhận" },
    { value: "shipped", label: "Đã giao cho đơn vị vận chuyển" },
    { value: "delivered", label: "Đã giao thành công" },
    { value: "cancelled", label: "Đã hủy" },
  ];

  const columns = [
    { title: "Mã đơn", dataIndex: "orderNumber" },
    {
      title: "Khách hàng",
      render: (_: any, record: any) => (
        <>
          <div>{record.user?.fullName}</div>
          <div className="text-gray-500 text-xs">{record.user?.email}</div>
          <div className="text-gray-500 text-xs">{record.user?.phone}</div>
        </>
      ),
    },
    {
      title: "Địa chỉ giao",
      render: (_: any, record: any) => (
        <>
          <div>{record.shippingInfo?.fullName}</div>
          <div className="text-gray-500 text-xs">{record.shippingInfo?.phone}</div>
          <div className="text-gray-500 text-xs">{record.shippingInfo?.address}</div>
        </>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: ["pricing", "finalPrice"],
      render: (price: number) => `${price.toLocaleString()}₫`,
    },
    {
      title: "Thanh toán",
      render: (_: any, record: any) => (
        <Tag color={record.payment.status === "pending" ? "orange" : "green"}>
          {record.payment.status === "pending" ? "Chờ thanh toán" : "Đã thanh toán"}
        </Tag>
      ),
    },
    {
      title: "Trạng thái hiện tại",
      dataIndex: "status",
      render: (status: string) => {
        let color = "default";
        let text = "";
        switch (status) {
          case "pending":
            color = "orange";
            text = "Chờ xử lý";
            break;
          case "confirmed":
            color = "blue";
            text = "Đã xác nhận";
            break;
          case "shipped":
            color = "cyan";
            text = "Đã giao cho đơn vị vận chuyển";
            break;
          case "delivered":
            color = "green";
            text = "Đã giao thành công";
            break;
          case "cancelled":
            color = "red";
            text = "Đã hủy";
            break;
          default:
            text = status;
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Điều chỉnh trạng thái",
      render: (_: any, record: any) => {
        const isDelivered = record.status === "delivered";
        const isPendingStatus = record.status === "pending";

        return (
          <Select
            defaultValue={record.status}
            size="small"
            style={{ width: 180 }}
            disabled={isDelivered || isPending}
            onChange={(value) => handleUpdateStatus(record._id, value)}
          >
            {statusOptions.map((option) => (
              <Select.Option
                key={option.value}
                value={option.value}
                disabled={!isPendingStatus && option.value === "cancelled"}
              >
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: "Hành động",
      render: (_: any, record: any) => (
        <Space>
          <Tooltip title="Xem chi tiết đơn hàng">
            <Button
              type="primary"
              icon={<EyeOutlined />}
              size="small"
              onClick={() => navigate(`/admin/orders/${record._id}`)}
            >
              Chi tiết
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quản lý đơn hàng</h2>
      {/* Hiệu ứng loading khi isLoading hoặc đang update status */}
      <Spin spinning={isLoading || isPending} tip="Đang tải...">
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
        />
      </Spin>
    </div>
  );
};

export default OrderListPage;
