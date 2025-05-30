import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { message } from "antd";
import AdminLayout from "@/layouts/AdminLayout";
import EditCategoryForm from "@/components/admin/Category/Editcategory";
import { useOne, useUpdate } from "@/hooks/useCategory";

export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: category, isLoading } = useOne({ resource: "categories", id });
  const { mutate: updateCategory } = useUpdate({ resource: "categories" });

  const handleFinish = (values: any) => {
    updateCategory(
      { id, values },
      {
        onSuccess: () => {
          
          navigate("/admin/categorys"); // chuyển về trang danh sách
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
    <AdminLayout>
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
    </AdminLayout>
  );
}
