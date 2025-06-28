// src/pages/admin/order/OrderDetailPage.tsx

import React from "react";
import { useParams } from "react-router-dom";
import { Descriptions, Table, Image, Tag } from "antd";
import { useOrderDetail } from "@/hooks/useOrder";

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading ,isError} = useOrderDetail(id);
  
  if (isError) {
    return <div>Đơn hàng không tồn tại hoặc đã bị xoá.</div>
  }

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (url: string) => <Image src={url} width={80} />,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Size",
      dataIndex: ["variant", "size"],
      key: "size",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Đơn giá",
      dataIndex: "unitPrice",
      key: "unitPrice",
      render: (value: number) => value.toLocaleString() + " VND",
    },
    {
      title: "Giá sau giảm",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      render: (value: number) => value.toLocaleString() + " VND",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chi tiết đơn hàng</h2>

      <Descriptions bordered column={1} loading={isLoading}>
        <Descriptions.Item label="Tên người nhận">{data?.shippingAddress.fullName}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">{data?.shippingAddress.phone}</Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
          {`${data?.shippingAddress.addressLine}, ${data?.shippingAddress.ward}, ${data?.shippingAddress.district}, ${data?.shippingAddress.province}`}
        </Descriptions.Item>
        <Descriptions.Item label="Phương thức thanh toán">
          <Tag color="blue">{data?.payment_method?.toUpperCase()}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Phương thức vận chuyển">
          {`${data?.shippingMethod.name} - Phí: ${data?.shippingMethod.fee?.toLocaleString()} VND`}
        </Descriptions.Item>
      </Descriptions>

      <h3 className="text-lg font-medium mt-6 mb-2">Danh sách sản phẩm</h3>
      <Table
        dataSource={data?.orderItems}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
        pagination={false}
      />
    </div>
  );
};

export default OrderDetailPage;
