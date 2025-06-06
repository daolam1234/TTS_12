// src/pages/admin/Category.tsx

import ProductInfo from "@/components/admin/Product/ProductInfo";

import VariantTable from "@/components/admin/Product/VariantTable";

import { useState } from "react";



export default function ProductDetailPage() {
    const [product] = useState({
        name: 'Quần kaki Nam Cotton Slim fit AKK02107',
        shortDesc: 'Mã rút gọn: AKK02107 Form Dáng: Slim Fit...',
        description: 'Thiết kế lịch sự, tôn dáng...',
        price: 400000,
        category: 'Quần',
        status: 'Mở bán',
        updatedAt: '25/03/2025 15:08:45',
        variants: [
          {
            id: 1,
            image: 'https://example.com/img1.jpg',
            size: '29',
            colorCode: '#f5deb3',
            quantity: 36,
            status: 'Mở bán',
          },
          {
            id: 2,
            image: 'https://example.com/img2.jpg',
            size: '30',
            
            colorCode: '#000000',
            quantity: 31,
            status: 'Mở bán',
          },
        ],
      });
    
      const handleEdit = (id: number) => {
        console.log('Sửa biến thể', id);
      };
    
      const handleStop = (id: number) => {
        console.log('Dừng bán biến thể', id);
      };

  return (
  
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Chi tiết sản phẩm</h2>
         
        </div>
        <div className="space-y-6">
            <ProductInfo product={product} />
            <VariantTable
              variants={product.variants}
              onEdit={handleEdit}
              onStop={handleStop}
            />
          </div>
      </div>

      
    
  );
}
