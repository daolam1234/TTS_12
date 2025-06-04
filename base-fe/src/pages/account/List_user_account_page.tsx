
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import AccountUseTable from '@/components/admin/account/account_table';


const ListAccountUsePage = () => {


  return (
    <AdminLayout>
      <div className="p-4 bg-white rounded shadow">
        <h1 className="text-xl font-semibold mb-4">DANH SÁCH USER </h1>
       
      <AccountUseTable />
      </div>
    </AdminLayout>
  );
};

export default ListAccountUsePage;
