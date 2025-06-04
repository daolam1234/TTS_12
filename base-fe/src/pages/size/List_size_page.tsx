// src/pages/admin/Category.tsx

import SizeTable from "@/components/admin/size/table_size";
import AdminLayout from "@/layouts/AdminLayout";
import { useState } from "react";



export default function SizeListPage() {
    const [sizes] = useState([
        { id: 1, name: "M", createdAt: "04/04/2025", updatedAt: "04/04/2025" },
        { id: 2, name: "L", createdAt: "04/04/2025", updatedAt: "04/04/2025" },
        { id: 3, name: "XL", createdAt: "04/04/2025", updatedAt: "04/04/2025" },
        { id: 4, name: "29", createdAt: "04/04/2025", updatedAt: "04/04/2025" },
        { id: 5, name: "30", createdAt: "04/04/2025", updatedAt: "04/04/2025" },
        { id: 6, name: "31", createdAt: "04/04/2025", updatedAt: "04/04/2025" },
      ]);

  return (
    <AdminLayout>
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold"> Quản lý biến thể</h2>
         
        </div>
        <div className="mt-6 overflow-auto">
            <SizeTable sizes={sizes} />
        </div>
      
      </div>

      
    </AdminLayout>
  );
}
