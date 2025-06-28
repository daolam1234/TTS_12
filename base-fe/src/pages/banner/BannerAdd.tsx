// src/pages/admin/banner/BannerAddPage.tsx

import React from "react";
import { Form, Input, Button, Switch, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCreateBanner } from "@/hooks/usebanner";

const BannerAddPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); 
  const createBanner = useCreateBanner();

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description || "");
      formData.append("link", values.link || "");
      formData.append("isActive", values.isActive ? "true" : "false");

      const file = values.image?.[0]?.originFileObj;
      if (!file) {
        message.error("Vui lòng chọn ảnh banner");
        return;
      }
      formData.append("image", file);

      // ✅ Log chi tiết FormData
      console.log("✅ FormData gửi đi:");
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: [File] name=${value.name}, size=${value.size}`);
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const response = await createBanner.mutateAsync(formData);

      console.log("✅ Response trả về từ BE:", response);

      message.success("Tạo banner thành công!");
      navigate("/admin/banners");
    } catch (error) {
      console.error("❌ Lỗi khi tạo banner:", error);
      message.error("Tạo banner thất bại");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Thêm Banner</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ isActive: true }}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input placeholder="Nhập tiêu đề" />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea placeholder="Nhập mô tả" rows={3} />
        </Form.Item>

        <Form.Item label="Link" name="link">
          <Input placeholder="Nhập link (nếu có)" />
        </Form.Item>

        <Form.Item
          label="Ảnh Banner"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
          rules={[{ required: true, message: "Vui lòng chọn ảnh banner" }]}
        >
          <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="Trạng thái" name="isActive" valuePropName="checked">
          <Switch checkedChildren="Hiện" unCheckedChildren="Ẩn" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={createBanner.isLoading}
          >
            Thêm Banner
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BannerAddPage;
