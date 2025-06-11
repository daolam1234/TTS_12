import { useCreateBanner } from "@/hooks/usebanner";
import type { BannerFormValues } from "@/types/banner/banner";
import { Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary"; // đường dẫn tùy bạn
import type { UploadFile } from "antd/es/upload/interface";

const FormAddBanner = () => {
    const [form] = Form.useForm();
    const { mutate: addBanner, isPending } = useCreateBanner();

    const onFinish = async (values: BannerFormValues & { imageUpload: UploadFile[] }) => {
        try {
            const file = values.imageUpload?.[0]?.originFileObj;

            if (!file) {
                message.error("Vui lòng chọn ảnh!");
                return;
            }

            const imageUrl = await uploadToCloudinary(file);

            // Chỉ gửi các trường cần thiết
            const { title, mota } = values;
            addBanner({ title, mota, image: imageUrl });
            form.resetFields();
        } catch (error) {
            console.error(error);
            message.error("Tải ảnh thất bại!");
        }
    };

    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Tiêu đề" name="title" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Ảnh banner"
                name="imageUpload"
                valuePropName="fileList"
                getValueFromEvent={(e) => Array.isArray(e) ? e : e?.fileList}
                rules={[{ required: true, message: "Vui lòng chọn ảnh!" }]}
            >
                <Upload beforeUpload={() => false} maxCount={1} listType="picture">
                    <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                </Upload>
            </Form.Item>

            <Form.Item label="Mô tả" name="mota" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" type="primary" loading={isPending}>
                    Thêm
                </Button>
            </Form.Item>
        </Form>
    );
};

export default FormAddBanner;
