  import React, { useState } from "react"
  import {
    Table,
    Tag,
    Image,
    Button,
    Popconfirm,
    message,
  } from "antd"
  import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
  } from "@ant-design/icons"
  import { useNavigate } from "react-router-dom"
  import dayjs from "dayjs"
  import { useProductList } from "@/hooks/useProducts"
  import { productService } from "@/services/Product"

  export default function ProductPage() {
    const [page, setPage] = useState(1) // 🔧 Thêm useState để quản lý page
    const { data = {}, isLoading, refetch } = useProductList({ page })
    const navigate = useNavigate()

    const products = (data?.products || []).map((item) => item._doc || item)
    const pagination = data?.pagination || {}

    const handleDelete = async (id: string) => {
      try {
        await productService.softDelete(id)
        message.success("Đã xoá sản phẩm")
        refetch()
      } catch (error) {
        message.error("Xoá thất bại")
      }
    }

    const columns = [
      {
        title: "Ảnh",
        dataIndex: "thumbnails",
        key: "thumbnails",
        width: 100,
        align: "center" as const,
        render: (thumbs: any[]) => (
          <Image
            src={thumbs?.[0]?.url || "/placeholder.png"}
            width={60}
            height={60}
          />
        ),
      },
      {
        title: "Tên",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Danh mục",
        dataIndex: "product_category_id",
        key: "product_category_id",
        render: (cat: any) => cat?.title || "---",
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price",
        render: (price: number) => price.toLocaleString() + "₫",
      },
      {
        title: "Tồn kho",
        dataIndex: "stock",
        key: "stock",
        render: (stock: number) => (
          <Tag color={stock > 0 ? "green" : "red"}>
            {stock > 0 ? `Còn ${stock}` : "Hết hàng"}
          </Tag>
        ),
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
        title: "Ngày cập nhật",
        dataIndex: "updatedAt",
        key: "updatedAt",
        render: (date: string) =>
          date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "---",
      },
      {
        title: "Thao tác",
        key: "actions",
        align: "center" as const,
        render: (_: any, record: any) => (
          <div className="flex justify-center gap-2">
            <Button
              type="default"
              onClick={() => navigate(`/admin/products/details/${record._id}`)}
            >
              Xem
            </Button>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => navigate(`/admin/products/edit/${record._id}`)}
            />
            <Popconfirm
              title="Xác nhận xoá sản phẩm này?"
              okText="Xoá"
              cancelText="Huỷ"
              onConfirm={() => handleDelete(record._id)}
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </div>
        ),
      }
    ]

    return (
      <div className="p-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Danh sách sản phẩm</h2>
            <div className="flex gap-2">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate("/admin/products/add")}
              >
                Thêm sản phẩm
              </Button>
              <Button
                type="default"
                danger
                onClick={() => navigate("/admin/products/deleted")}
              >
                Sản phẩm đã xoá
              </Button>
            </div>
          </div>

          <Table
            rowKey={(record) => record._id}
            dataSource={products}
            columns={columns}
            loading={isLoading}
            pagination={{
              total: pagination.total || 0,
              pageSize: pagination.limit || 10,
              current: pagination.page || page,
              showSizeChanger: false,
              onChange: (page) => setPage(page), // 🔧 Cập nhật page khi đổi trang
            }}
          />
        </div>
      </div>
    )
  }
