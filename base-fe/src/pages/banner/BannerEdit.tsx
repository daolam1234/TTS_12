import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { Form, Input, Button, Upload, Switch, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useBannerDetail, useUpdateBanner } from "@/hooks/usebanner";

const BannerEditPage = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = useForm();
    const navigate = useNavigate();

    const { data, isLoading } = useBannerDetail(id || "");
    const updateBanner = useUpdateBanner();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                title: data.title,
                description: data.description,
                link: data.link,
                isActive: data.isActive,
                image: [
                    {
                        uid: "-1",
                        name: "banner.jpg",
                        status: "done",
                        url: `http://localhost:8888/${data.image.replace(/\\/g, "/")}`,
                    },
                ],
            });
        }
    }, [data]);

    const onFinish = (values: any) => {
        if (!id) {
            message.error("Không tìm thấy ID banner để cập nhật.");
            return;
        }

        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description || "");
        formData.append("link", values.link || "");
        formData.append("isActive", values.isActive ? "true" : "false");

        const file = values.image?.[0]?.originFileObj;
        if (file) {
            formData.append("image", file);
        } else if (data?.image) {
            formData.append("image", data.image);
        }

        console.log("✅ ID gửi đi:", id);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        updateBanner.mutate(
            { id, data: formData },
            {
                onSuccess: () => {
                    message.success("Cập nhật banner thành công");
                    navigate("/admin/banners");
                },
                onError: () => {
                    message.error("Cập nhật banner thất bại");
                },
            }
        );
    };

    return (
        <div className="p-4 bg-white rounded shadow max-w-xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Cập nhật Banner</h2>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}>
                    <Input placeholder="Nhập tiêu đề" />
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                    <Input.TextArea placeholder="Nhập mô tả" />
                </Form.Item>
                <Form.Item label="Link" name="link">
                    <Input placeholder="Nhập link" />
                </Form.Item>
                <Form.Item label="Ảnh Banner" name="image" valuePropName="fileList" getValueFromEvent={e => e?.fileList}>
                    <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Trạng thái" name="isActive" valuePropName="checked">
                    <Switch checkedChildren="Hiện" unCheckedChildren="Ẩn" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={updateBanner.isLoading}>
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default BannerEditPage;
