import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, message, Spin } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { useOneBanner, useUpdateBanner } from "@/hooks/usebanner";
import type { BannerFormValues } from "@/types/banner/banner";
import type { UploadFile } from "antd/es/upload/interface";

const FormEditBanner = () => {
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const { data: banner, isLoading } = useOneBanner({ id });
  const { mutate: updateBanner, isPending } = useUpdateBanner();

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (banner) {
      form.setFieldsValue({
        title: banner.title,
        mota: banner.mota,
        imageUpload: [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: banner.image,
          },
        ],
      });
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: banner.image,
        },
      ]);
    }
  }, [banner, form]);

  const onFinish = async (values: BannerFormValues & { imageUpload?: UploadFile[] }) => {
    try {
      let imageUrl = banner?.image;

      const file = values.imageUpload?.[0]?.originFileObj;
      if (file) {
        imageUrl = await uploadToCloudinary(file);
      }

      updateBanner({
        id: id as string,
        values: {
          title: values.title,
          mota: values.mota,
          image: imageUrl,
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      message.error("Cập nhật banner thất bại!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ width: "100%", maxWidth: 700, marginTop: 24 }}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="mota"
          rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Ảnh banner"
          name="imageUpload"
          valuePropName="fileList"
          getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
        >
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={({ fileList }) => {
              setFileList(fileList);
              form.setFieldsValue({ imageUpload: fileList });
            }}
            beforeUpload={() => false}
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </Form.Item>

        <Form.Item className="text-right">
          <Button
            htmlType="submit"
            type="primary"
            loading={isPending}
            style={{ backgroundColor: "#007BFF", color: "white" }}
          >
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormEditBanner;
