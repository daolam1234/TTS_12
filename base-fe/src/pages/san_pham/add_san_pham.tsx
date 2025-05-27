// src/pages/admin/Category.tsx

import FormAddSanPham from "@/components/admin/san_pham/Formadd";
import AdminLayout from "@/layouts/AdminLayout";



export default function AddSanPham() {


  return (
    <AdminLayout>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Thêm sản phẩm</h2>
         
        </div>
        <FormAddSanPham />
      </div>

      
    </AdminLayout>
  );
}
