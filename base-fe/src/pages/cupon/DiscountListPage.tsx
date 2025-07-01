import React from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { useDiscountList, useDeleteDiscount } from "@/hooks/useDiscount";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const DiscountListPage: React.FC = () => {
  const { data: discounts, isLoading } = useDiscountList();
  const deleteDiscountMutation = useDeleteDiscount();
  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    try {
      await deleteDiscountMutation.mutateAsync(id);
      message.success("Xoá thành công");
    } catch {
      message.error("Xoá thất bại");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Danh sách mã giảm giá</h2>
      <Button type="primary" onClick={() => navigate("/admin/coupon/add")}>
        Thêm mới
      </Button>
      <Table
        loading={isLoading}
        rowKey="_id"
        className="mt-4"
        dataSource={discounts}
        columns={[
          { title: "Mã", dataIndex: "code" },
          { title: "Giảm (%)", dataIndex: "discount_percent" },
          {
            title: "Bắt đầu",
            dataIndex: "start_date",
            render: (date) => dayjs(date).format("DD/MM/YYYY"),
          },
          {
            title: "Kết thúc",
            dataIndex: "end_date",
            render: (date) => dayjs(date).format("DD/MM/YYYY"),
          },
          {
            title: "Không giới hạn",
            dataIndex: "is_unlimited",
            render: (v) => (v ? "✅" : "❌"),
          },
          { title: "Tối đa", dataIndex: "max_uses" },
          {
            title: "Hành động",
            render: (_, record) => (
              <>
                <Button
                  size="small"
                  onClick={() => navigate(`/admin/coupon/edit/${record._id}`)}
                >
                  Sửa
                </Button>{" "}
                <Popconfirm title="Xoá?" onConfirm={() => handleDelete(record._id)}>
                  <Button size="small" danger>
                    Xoá
                  </Button>
                </Popconfirm>
              </>
            ),
          },
        ]}
      />
    </div>
  );
};

export default DiscountListPage;
