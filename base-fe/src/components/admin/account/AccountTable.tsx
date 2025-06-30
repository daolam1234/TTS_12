import React from "react";
import { Table, Button, Popconfirm, Tag, Space, message } from "antd";
import { useAccountList, useLockAccount, useRestoreAccount, useDeleteAccount } from "@/hooks/useAccout";

const ListAccountPage = () => {
  const { data: accounts, isLoading, refetch } = useAccountList();
  const lockAccount = useLockAccount();
  const restoreAccount = useRestoreAccount();
  const deleteAccount = useDeleteAccount();

  const handleToggleStatus = async (id: string, isDeleted: boolean) => {
    try {
      if (!isDeleted) {
        await lockAccount.mutateAsync(id);
        message.success("Đã khóa tài khoản");
      } else {
        await restoreAccount.mutateAsync(id);
        message.success("Đã mở khóa tài khoản");
      }
      refetch();
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  const handleSoftDelete = (id: string) => {
    deleteAccount.mutate(id);
  };

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
          {!record.deleted ? "Đang hoạt động" : "Đã khóa"}
        </Tag>
      ),
    },
    {
      title: "Hành động",
      render: (_: any, record: any) => (
        <Space>
          <Popconfirm
            title={`Bạn chắc chắn muốn ${
              record.deleted ? "mở khóa" : "khóa"
            } tài khoản này?`}
            onConfirm={() => handleToggleStatus(record._id, record.deleted)}
          >
            <Button
              size="small"
              danger={!record.deleted}
              type={record.deleted ? "default" : "primary"}
            >
              {record.deleted ? "Mở khóa" : "Khóa"}
            </Button>
          </Popconfirm>

          
        </Space>
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
