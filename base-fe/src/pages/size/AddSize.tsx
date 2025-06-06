// src/pages/admin/Category.tsx

import FormAddSize from "@/components/admin/size/FormAdd";
import AdminLayout from "@/layouts/AdminLayout";



export default function SizeAddPage() {


  return (
  
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Thêm  mới kích cỡ</h2>
         
        </div>
        <FormAddSize/>
      </div>

      
    
  );
}
