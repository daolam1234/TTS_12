import React, { useEffect, useState } from "react"
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Upload,
  message,
  Image,
} from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { Controller, useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { categoryService } from "@/services/category"
import type { RcFile } from "antd/es/upload"

interface CategoryFormValues {
  title: string
  description: string
  parent_id?: string
  thumbnails: string
  status: string
  position: number
}

const EditCategoryPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { control, handleSubmit, setValue, reset } = useForm<CategoryFormValues>()
  const [imagePreview, setImagePreview] = useState<string>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await categoryService.getById(id!)
        const { category } = res.data?.data
        console.log("✅ Dữ liệu từ API:", category)

        reset({
          title: category.title || "",
          description: category.description || "",
          parent_id: category.parent_id || "",
          thumbnails: category.thumbnails || "",
          status: category.status || "active",
          position: category.position || 1,
        })
        setImagePreview(category.thumbnails)
      } catch (err) {
        console.error("❌ Lỗi khi lấy danh mục:", err)
        message.error("Không thể tải dữ liệu danh mục")
      }
    }

    if (id) fetchData()
  }, [id, reset])

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      await categoryService.update(id!, values)
      message.success("Cập nhật danh mục thành công")
      navigate("/admin/categorys")
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật:", error)
      message.error("Lỗi khi cập nhật danh mục")
    }
  }

  const handleUpload = async (file: RcFile) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "unsigned_preset")

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/diomg2vwr/image/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()

      if (data.secure_url) {
        setValue("thumbnails", data.secure_url)
        setImagePreview(data.secure_url)
      } else {
        message.error("Upload ảnh thất bại")
      }
    } catch (err) {
      message.error("Có lỗi khi upload ảnh")
    }

    return false
  }

  return (
    <Card title="Chỉnh sửa danh mục">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Tên danh mục" required>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} value={field.value || ""} />}
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea rows={3} {...field} value={field.value || ""} />}
          />
        </Form.Item>

        <Form.Item label="ID cha (nếu có)">
          <Controller
            name="parent_id"
            control={control}
            render={({ field }) => <Input {...field} value={field.value || ""} />}
          />
        </Form.Item>

        <Form.Item label="Thứ tự hiển thị">
          <Controller
            name="position"
            control={control}
            render={({ field }) => <Input type="number" {...field} value={field.value} />}
          />
        </Form.Item>

        <Form.Item label="Trạng thái">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select {...field} value={field.value}>
                <Select.Option value="active">Hiển thị</Select.Option>
                <Select.Option value="inactive">Ẩn</Select.Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item label="Ảnh đại diện">
          {imagePreview && (
            <div className="mb-2">
              <Image width={100} src={imagePreview} alt="Preview" />
            </div>
          )}
          <Upload beforeUpload={handleUpload} showUploadList={false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Cập nhật danh mục
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default EditCategoryPage