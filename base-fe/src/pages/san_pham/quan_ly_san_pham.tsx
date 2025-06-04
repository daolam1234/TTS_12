// src/pages/admin/Category.tsx

import ProductTable from "@/components/admin/san_pham/TableProduct";
import AdminLayout from "@/layouts/AdminLayout";



export default function QuanLySanPham() {


  return (
    <AdminLayout>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold"> Quản lý sản phẩm</h2>
         
        </div>
        <div className="mt-6 overflow-auto">
           <ProductTable />
        </div>
       
      </div>

      
    </AdminLayout>
  );
}
