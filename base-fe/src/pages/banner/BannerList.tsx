import React from "react";
import { Table, Button, Popconfirm, Tag, Image, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useBannerList, useDeleteBanner } from "@/hooks/usebanner";

const BannerListPage = () => {
  const navigate = useNavigate();
  const { data: banners, isLoading } = useBannerList();
  const deleteBanner = useDeleteBanner();

  const handleDelete = (id: string) => {
    deleteBanner.mutate(id);
  };

  const columns = [
    { title: "Tiêu đề", dataIndex: "title" },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (_: any, record: any) => (
       
    <Image src={`${record.image}`} 

        width={100}
        height={60}
        style={{ objectFit: "cover", borderRadius: 8 }}
      />
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>{isActive ? "Hiện" : "Ẩn"}</Tag>
      ),
    },
    {
      title: "Hành động",
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => navigate(`/admin/banners/edit/${record._id}`)}

          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn chắc chắn muốn xóa banner này?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<DeleteOutlined />} danger size="small">
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Quản lý Banner</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/admin/banners/add")}
        >
          Thêm Banner
        </Button>
      </div>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={banners}
        rowKey="_id"
      />
    </div>
  );
};

export default BannerListPage;
