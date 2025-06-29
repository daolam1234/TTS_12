export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  product_category_id: string;
  status: "active" | "inactive";  // ✅ OK
  stock: number;
  createdAt: string;
  updatedAt: string;
  thumbnails: {
    url: string;
    position: number;
  }[];
  deleted: boolean;
  discountPercentage?: number;
  discountStartDate?: string | null;
  discountEndDate?: string | null;
  variants: {
    _id: string;
    size: string;
    stock: number;
  }[];
}

// types/ProductFormValues.ts
import type { UploadFile } from "antd/es/upload/interface";

export interface Variant {
  _id?: string; // có thể có khi edit
  size: string;
  stock: number;
}

export interface ProductFormValues {
  _id?: string;
  title: string;
  description: string;
  price: number;
  product_category_id: string;
  stock: number;
  status: "active" | "inactive";  // ✅ OK, giống type
  thumbnails: UploadFile[];
  discountPercentage?: number;
  discountStartDate?: string | null;
  discountEndDate?: string | null;
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
    size: string
    stock: number

  }[]
}