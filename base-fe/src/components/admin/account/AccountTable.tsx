import React from "react";
import { Table, Button, Popconfirm, Tag } from "antd";
import { useAccountList, useDeleteAccount } from "@/hooks/useAccout";

const ListAccountPage = () => {
  const { data: accounts, isLoading } = useAccountList();
  const deleteAccount = useDeleteAccount();

  const columns = [
    { title: "Tên", dataIndex: "fullName" },
    { title: "Email", dataIndex: "email" },
    { title: "Giới tính", dataIndex: "gender" },
    {
      title: "Vai trò",
      dataIndex: "admin",
      render: (admin: boolean) => (
        <Tag color={admin ? "blue" : "default"}>
          {admin ? "Admin" : "User"}
        </Tag>
      ),
    },
    { 
      title: "Trạng thái", 
      render: (_: any, record: any) => (
        <Tag color={!record.deleted ? "green" : "red"}>
          {!record.deleted ? "Đang hoạt động" : "Đã xóa"}
        </Tag>
      )
    },
    {
      title: "Hành động",
      render: (_: any, record: any) => (
        <>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa?"
            onConfirm={() => deleteAccount.mutate(record._id)}
          >
            <Button danger size="small">Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Quản lý tài khoản</h2>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={accounts}
        rowKey="_id"
      />
    </div>
  );
};

export default ListAccountPage;
