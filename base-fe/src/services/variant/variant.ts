import instanceAxios from "@/utils/axios";

export interface ProductVariant {
  size: string;
  stock: number;
  _id?: string;
}

// Thêm biến thể mới
export const addProductVariants = async (productId: string, variants: ProductVariant[]) => {
  const res = await instanceAxios.post(`/products/${productId}/variants`, { variants });
  return res.data?.data; // hoặc trả về res.data?.data.product nếu chỉ cần product
};
export const variantService = {
    edit: async (productId: string, variantIndex: number, data: { size: string; stock: number }) => {
        const res = await instanceAxios.put(
          `/products/${productId}/variants/${variantIndex}`,
          data
        );
        return res.data;
      },
  
  
      delete: async (productId: string, variantIndex: string) => {
        const res = await instanceAxios.delete(`/products/${productId}/variants/${variantIndex}`);
        return res.data;
      },
    getDetail: async (productId: string, variantIndex: string) => {
        const res = await instanceAxios.get(`/products/${productId}/variants/${variantIndex}`);
        return res.data;
      },
    
    };
