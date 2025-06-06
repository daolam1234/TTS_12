
import VoucherTable from "@/components/admin/vouchers/voucherTable";
import AdminLayout from "@/layouts/AdminLayout";
import type { Voucher } from "@/types/Voucher/voucher";

import { useNavigate } from "react-router-dom";

const mockData: Voucher[] = [
    {
        id: 1,
        name: 'Giảm 40%',
        code: 'VOUCHER40',
        discountPercent: 40,
        maxDiscount: 20000,
        quantity: 50,
        description: 'Giảm giá 40% cho đơn hàng từ 100K',
        startDate: '2025-03-31T00:00:00',
        endDate: '2025-04-01T00:00:00',
        createdAt: '2025-03-31T19:27:05',
        updatedAt: '2025-04-03T21:01:07',
        status: 'active',
      },
    ];

export default function VouchersPage() {

    const navigate = useNavigate();
  return (
  
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">QUẢN LÝ MÃ GIẢM GIÁ</h2>
         
        </div>
        <div className="mt-6 overflow-auto">
          <VoucherTable
            data={mockData}
            onEdit={(voucher) => navigate(`/admin/vouchers/edit/${voucher.id}`)}
          />
        </div>
        
      </div>

      
    
  );
}
