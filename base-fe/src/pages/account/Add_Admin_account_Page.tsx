// src/pages/admin/AddAdminPage.tsx
import React, { useState } from 'react';
import { message } from 'antd';

import { useNavigate } from 'react-router-dom';
import AdminForm from '@/components/admin/account/account_AdminForm';
import AdminLayout from '@/layouts/AdminLayout';

const AddAdminPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateAdmin = async (formData: any) => {
    try {
      setLoading(true);
      console.log('Tạo tài khoản với dữ liệu:', formData);

      // TODO: Gọi API tại đây
      // await axios.post('/api/admins', formData);

      message.success('Tạo tài khoản thành công');
      navigate('/admin/account_admin'); // Quay về danh sách admin
    } catch (error) {
      message.error('Tạo tài khoản thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
        <AdminLayout>
 <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Thêm tài khoản admin</h1>
      <AdminForm onSubmit={handleCreateAdmin} loading={loading} />
    </div>
    </AdminLayout>
   
  );
};

export default AddAdminPage;
