
import { Button } from 'antd';
import AccountAdminTable from '@/components/admin/Account/AccountTable';

import { useNavigate } from 'react-router-dom';


const ListAccountPage = () => {

  const navigate = useNavigate();
  return (
  
      <div className="p-4 bg-white rounded shadow">
        <h1 className="text-xl font-semibold mb-4">DANH SÁCH TÀI KHOẢN </h1>
       
      <AccountAdminTable />
      </div>
    
  );
};

export default ListAccountPage;
