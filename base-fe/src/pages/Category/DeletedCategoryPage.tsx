import React from "react"
import { Table, Tag, Image, Button, Popconfirm, message } from "antd"
import { ReloadOutlined, DeleteOutlined } from "@ant-design/icons"
import { useDeletedCategoryList } from "@/hooks/useCategory"
import { categoryService } from "@/services/category"
import dayjs from "dayjs"

const DeletedCategoryPage = () => {
  const { data = [], isLoading, refetch } = useDeletedCategoryList()

  const categories = (data || []).map((item: any) => item._doc || item)

  const handleRestore = async (id: string) => {
    try {
      await categoryService.restore(id)
      message.success("✅ Khôi phục thành công")
      refetch()
    } catch (err) {
      message.error("❌ Khôi phục thất bại")
    }
  }

  const handleForceDelete = async (id: string) => {
    try {
      await categoryService.forceDelete(id)
      message.success("✅ Xoá vĩnh viễn thành công")
      refetch()
    } catch (err) {
      message.error("❌ Xoá vĩnh viễn thất bại")
    }
  }

  const columns = [
    {
      title: "Tên danh mục",
      dataIndex: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Ảnh",
      dataIndex: "thumbnails",
      width: 100,
      align: "center" as const,
      render: (img: string) => (
        <Image src={img || "/placeholder.png"} width={60} height={60} />
      ),
    },
    {
      title: "Thứ tự",
      dataIndex: "position",
      align: "center" as const,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (value: string) => (
        <Tag color={value === "active" ? "green" : "red"}>
          {value === "active" ? "Hiển thị" : "Ẩn"}
        </Tag>
      ),
      align: "center" as const,
    },
    {
      title: "Ngày xoá",
      dataIndex: "deletedAt",
      render: (value: string) => dayjs(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center" as const,
      render: (_: any, record: any) => (
        <div className="flex justify-center gap-2">
          <Popconfirm
            title="Xác nhận khôi phục?"
            okText="Khôi phục"
            cancelText="Huỷ"
            onConfirm={() => handleRestore(record._id)}
          >
            <Button icon={<ReloadOutlined />} type="primary" />
          </Popconfirm>

          <Popconfirm
            title="Xoá vĩnh viễn danh mục này?"
            okText="Xoá"
            cancelText="Huỷ"
            onConfirm={() => handleForceDelete(record._id)}
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
        <h2 className="text-lg font-semibold mb-4">🗑️ Danh mục đã bị xoá</h2>
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

export default DeletedCategoryPage
