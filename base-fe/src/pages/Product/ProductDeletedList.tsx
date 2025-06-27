import React, { useEffect, useState } from "react"
import {
  Table,
  Tag,
  Image,
  Button,
  message,
} from "antd"
import { RollbackOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"

import { productService } from "@/services/Product"
import { useDeletedProducts } from "@/hooks/useProducts"

export default function DeletedProductPage() {
  const [page, setPage] = useState(1)
  const { data = {}, isLoading, refetch, error } = useDeletedProducts(page)
  const navigate = useNavigate()

  // ✅ Log lỗi chi tiết
  useEffect(() => {
    if (error) {
      console.error("❌ Lỗi khi lấy danh sách sản phẩm đã xoá:", error)
      if ((error as any)?.response) {
        const res = (error as any).response
        console.error("📦 Response lỗi:", res.data)
        message.error(res.data?.message || "Đã xảy ra lỗi khi lấy dữ liệu")
      } else {
        message.error("Lỗi không xác định")
      }
    }
  }, [error])

  const products = (data?.products || []).map((item) => item._doc || item)
  const pagination = data?.pagination || {}

  const handleRestore = async (id: string) => {
    try {
      await productService.restore(id)
      message.success("Khôi phục sản phẩm thành công")
      refetch()
    } catch (error) {
      console.error("❌ Lỗi khi khôi phục:", error)
      message.error("Khôi phục thất bại")
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
      title: "Ngày xoá",
      dataIndex: "deletedAt",
      key: "deletedAt",
      render: (date: string) =>
        date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "---",
    },
    {
      title: "Thao tác",
      key: "actions",
      align: "center" as const,
      render: (_: any, record: any) => (
        <Button
          icon={<RollbackOutlined />}
          type="default"
          onClick={() => handleRestore(record._id)}
        >
          Khôi phục
        </Button>
      ),
    },
  ]

  return (
    <div className="p-4">
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Danh sách sản phẩm đã xoá</h2>
          <Button onClick={() => navigate("/admin/products")}>Quay lại</Button>
        </div>

        <Table
          rowKey={(record) => record._id}
          dataSource={products}
          columns={columns}
          loading={isLoading}
          pagination={{
            total: pagination.totalItems || 0,
            pageSize: pagination.itemsPerPage || 10,
            current: pagination.currentPage || page,
            showSizeChanger: false,
            onChange: (page) => setPage(page),
          }}
        />
      </div>
    </div>
  )
}
