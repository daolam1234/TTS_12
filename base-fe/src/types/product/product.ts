export  interface  Product  {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  status: string;
  stock: number;
  date: string;
  image: string;
  isDeleted: boolean;
};
export interface ProductFormValues {
id:number | null; // Optional for new products
  name: string;
  productName: string; 
  size:string;
  createdAt: string;
  description: string;
  price: number;
  category: string;
  status: string;
  stock: number;
    image: string;
  
      isDeleted?: boolean;
 // Optional for file upload
}
// types/ProductFormValues.ts
import type { UploadFile } from "antd/es/upload/interface";

export interface VariantAttribute {
  attribute_id: string;
  value: string;
}

export interface Variant {
  size: string;
  stock: number;
  price: number;
  price_discount?: number;
  thumbnails: UploadFile[];
  attributes: VariantAttribute[];
}

export interface ProductFormValues {
  title: string;
  price: number;
  description: string;
  product_category_id: string;
  thumbnails: UploadFile[];
  variants: Variant[];
}

export interface AddProductPayload {
  title: string
  description: string
  price: number
  stock?: number
  discountPercentage?: number
  discountStartDate?: string | null
  discountEndDate?: string | null
  product_category_id: string
  thumbnails: { url: string; position: number }[]
  variants: {
    name: string
    price: number
    stock: number
    thumbnails: string[] // URLs
  }[]
}