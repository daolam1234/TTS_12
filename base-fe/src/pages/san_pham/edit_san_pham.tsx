// src/pages/admin/Category.tsx


import FormeditSanPham from "@/components/admin/san_pham/Formedit";
import AdminLayout from "@/layouts/AdminLayout";



export default function EditSanPham() {


  return (
    <AdminLayout>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Thêm sản phẩm</h2>
         
        </div>
        <FormeditSanPham />
      </div>

      
    </AdminLayout>
  );
}
