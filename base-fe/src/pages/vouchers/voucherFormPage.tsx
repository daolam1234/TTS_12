import VoucherForm from "@/components/admin/vouchers/voucherForm";
import AdminLayout from "@/layouts/AdminLayout";


export default function VoucherFormPage() {

  return (

      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Thêm  mới mã giảm giá</h2>
         
        </div>
        <VoucherForm/>
      </div>

      
  
  );
}


