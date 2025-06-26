import React from "react"
import { Button, Card, Form, Input, Select, Upload, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { Controller, useForm } from "react-hook-form"
import type { RcFile } from "antd/es/upload"

import { useNavigate } from "react-router-dom"
import { createCategory } from "@/services/category"

interface CategoryFormValues {
  title: string
  description: string
  parent_id?: string
  thumbnails: string
  status: string
  position: number
}

const AddCategoryPage = () => {
  const { control, handleSubmit, setValue } = useForm<CategoryFormValues>({
    defaultValues: {
      status: "active",
      position: 1,
    },
  })

  const [previewUrl, setPreviewUrl] = React.useState<string>("")

  const navigate = useNavigate()

  const onSubmit = async (values: CategoryFormValues) => {
    console.log("✅ Form submitted values:", values)

    if (!values.thumbnails) {
      message.error("Vui lòng upload ảnh danh mục trước khi gửi.")
      return
    }

    try {
      const res = await createCategory(values)
      console.log("✅ API response:", res)
      message.success("Thêm danh mục thành công!")
      navigate("/admin/categorys")
    } catch (error) {
      console.error("❌ Lỗi khi tạo danh mục:", error)
      message.error("Đã có lỗi xảy ra khi thêm danh mục.")
    }
  }

  const handleUpload = async (file: RcFile) => {
    console.log("📤 Uploading file:", file)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "unsigned_preset") // thay bằng preset bạn đang dùng

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/diomg2vwr/image/upload", {
        method: "POST",
        body: formData,
      })

      const data = await res.json()
      console.log("✅ Upload kết quả:", data)

      if (data.secure_url) {
        setValue("thumbnails", data.secure_url)
        setPreviewUrl(data.secure_url)
      } else {
        console.error("❌ Upload thất bại:", data)
        message.error("Upload ảnh thất bại.")
      }
    } catch (error) {
      console.error("❌ Lỗi khi upload:", error)
      message.error("Lỗi khi upload ảnh.")
    }

    return false
  }

  return (
    <Card title="Thêm danh mục">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item label="Tên danh mục" required>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Mô tả">
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea {...field} />}
          />
        </Form.Item>

        <Form.Item label="ID cha (nếu có)">
          <Controller
            name="parent_id"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Vị trí">
          <Controller
            name="position"
            control={control}
            render={({ field }) => <Input type="number" {...field} />}
          />
        </Form.Item>

        <Form.Item label="Trạng thái">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <Select.Option value="active">Hiển thị</Select.Option>
                <Select.Option value="inactive">Ẩn</Select.Option>
              </Select>
            )}
          />
        </Form.Item>

        <Form.Item label="Ảnh đại diện">
          <Upload beforeUpload={handleUpload} showUploadList={false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload ảnh</Button>
          </Upload>
          {previewUrl && (
            <div style={{ marginTop: 12 }}>
              <img src={previewUrl} alt="Preview" style={{ maxWidth: 200, borderRadius: 8 }} />
            </div>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm danh mục
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default AddCategoryPage
