// src/pages/admin/AdminListPage.tsx
import React from 'react';
import { Button } from 'antd';
import AccountAdminTable from '@/components/admin/account/account_table';
import AdminLayout from '@/layouts/AdminLayout';
import { useNavigate } from 'react-router-dom';


const ListAccountPage = () => {

  const navigate = useNavigate();
  return (
    <AdminLayout>
      <div className="p-4 bg-white rounded shadow">
        <h1 className="text-xl font-semibold mb-4">DANH SÁCH ADMIN</h1>
        <Button type="primary" className="mb-4" onClick={() => navigate('/admin/account_admin/add')}>
          Thêm mới tài khoản
        </Button>
      <AccountAdminTable />
      </div>
    </AdminLayout>
  );
};

export default ListAccountPage;
