import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import EditCategoryForm from "@/components/admin/Category/EditCategory";
import { useOne, useUpdate } from "@/hooks/useCategory";

export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    message.error("Thiếu ID danh mục");
    navigate("/admin/categories");
    return null;
  }

  const { data: category, isLoading } = useOne({ resource: "categories", id });
  const { mutate: updateCategory } = useUpdate({ resource: "categories" });

  const handleFinish = (values: any) => {
    updateCategory(
      { id, values },
      {
        onSuccess: () => {
          message.success("Cập nhật thành công");
          navigate("/admin/categories"); 
        },
        onError: () => {
          message.error("Cập nhật thất bại");
        },
      }
    );
  };

  const handleCancel = () => {
    navigate("/admin/categories");
  };

  if (isLoading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Chỉnh sửa danh mục</h2>
      </div>
      <EditCategoryForm
        initialValues={category}
        onFinish={handleFinish}
        onCancel={handleCancel}
      />
    </div>
  );
}
