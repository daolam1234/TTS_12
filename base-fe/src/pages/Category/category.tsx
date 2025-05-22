// src/pages/admin/Category.tsx
import { Button, Modal } from "antd";
import { useState } from "react";
import { useCreate } from "@/hooks/useCategory";
import AddCategoryForm from "@/components/admin/Category/Addcategory";
import TableCategory from "@/components/admin/Category/Tablecategory";
import AdminLayout from "@/layouts/AdminLayout";


export default function Category() {
  const [visible, setVisible] = useState(false);
  const { mutate: createCategory } = useCreate({ resource: "categories" });

  const handleFinish = (values: any) => {
    createCategory(values, {
      onSuccess: () => {
        setVisible(false);
      },
    });
  };

  return (
    <AdminLayout>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Danh sách danh mục</h2>
          <Button type="primary" onClick={() => setVisible(true)}>
            Thêm danh mục
          </Button>
        </div>
        <TableCategory />
      </div>

      <Modal
        title="Thêm mới danh mục"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <AddCategoryForm
          onFinish={handleFinish}
          onCancel={() => setVisible(false)}
        />
      </Modal>
    </AdminLayout>
  );
}
