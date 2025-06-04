import React, { useState } from 'react';

import AdminLayout from '@/layouts/AdminLayout';

import CommentSearchBar from '@/components/admin/comments/CommentSearchBar';
import type { Comment } from '@/types/comments/comment';
import CommentTable from '@/components/admin/comments/CommentTable';

const initialData: Comment[] = [
  {
    key: 1,
    product: 'Quần rơi dệt kim Nam Regular Fit APA003W2',
    user: 'người dùng a',
    date: '27/03/2025 22:44',
    content: 'kajfgiihdgsfikj',
    status: true,
  },
  {
    key: 2,
    product: 'Quần rơi dệt kim Nam Regular Fit APA003W2',
    user: 'người dùng a',
    date: '27/03/2025 22:44',
    content: 'kjhasdfjvhsvfjhsg',
    status: true,
  },
  {
    key: 3,
    product: 'Quần kaki Nam Cotton Slim fit AKK02107',
    user: 'người dùng a',
    date: '27/03/2025 19:20',
    content: 'vbcv bnbxg',
    status: true,
  },
];
const CommentList = () => {
    const [data, setData] = useState<Comment[]>(initialData);
    const [search, setSearch] = useState('');
  
    const handleToggleStatus = (key: number, checked: boolean) => {
      const updated = data.map((item) =>
        item.key === key ? { ...item, status: checked } : item
      );
      setData(updated);
    };
  
    const handleDateChange = (_: any, __: [string, string]) => {
      // Lọc theo ngày nếu cần
    };
    return (
        <AdminLayout>
          <div className="p-4 bg-white rounded shadow">
            <h1 className="text-xl font-semibold mb-4">DANH SÁCH BÌNH LUẬN</h1>
            <CommentSearchBar
            search={search}
            onSearchChange={setSearch}
            onDateChange={handleDateChange}
          />
        <div className="mt-6 overflow-auto">
           <CommentTable
            data={data.filter((item) =>
              `${item.product} ${item.user} ${item.content}`
                .toLowerCase()
                .includes(search.toLowerCase())
            )}
            onToggleStatus={handleToggleStatus}
          />
        </div>
        
          </div>
        </AdminLayout>
      );
    }
    export default CommentList;

