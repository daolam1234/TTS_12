import { Table, Tag, Image, Button, Popconfirm, message } from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import React from "react"
import { useCategoryList } from "../../hooks/useCategory"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import { categoryService } from "../../services/category"

export default function CategoryPage() {
  const { data = [], isLoading, refetch } = useCategoryList()
  const navigate = useNavigate()

  const categories = (data || []).map((item: any) => item._doc || item)

  const handleDelete = async (id: string) => {
    try {
      await categoryService.softDelete(id)
      message.success("Đã xóa danh mục")
      refetch()
    } catch (error) {
      message.error("Xóa thất bại")
    }
  }

  const columns = [
    {
      title: "Tên",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ảnh",
      dataIndex: "thumbnails",
      key: "thumbnails",
      width: 100,
      align: "center" as const,
      render: (img: string) => (
        <Image src={img || "/placeholder.png"} width={60} height={60} />
      ),
    },
    {
      title: "Thứ tự",
      dataIndex: "position",
      key: "position",
      align: "center" as const,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value: string) => (
        <Tag color={value === "active" ? "green" : "red"}>
          {value === "active" ? "Hiển thị" : "Ẩn"}
        </Tag>
      ),
      align: "center" as const,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center" as const,
      render: (_: any, record: any) => (
        <div className="flex justify-center gap-2">
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={() => navigate(`/admin/categorys/edit/${record._id}`)}
          />
          <Popconfirm
            title="Xác nhận xoá?"
            okText="Xoá"
            cancelText="Huỷ"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Danh sách danh mục</h2>
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/admin/categorys/add")}
            >
              Thêm danh mục
            </Button>
            <Button
              type="default"
              danger
              onClick={() => navigate("/admin/categorys/deleted")}
            >
              Danh mục đã xoá
            </Button>
          </div>
        </div>
        <Table
          rowKey={(record) => record._id}
          dataSource={categories}
          columns={columns}
          loading={isLoading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  )
}
