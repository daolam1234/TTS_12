import type { ProductFormValues } from "@/types/product/product";
import instanceAxios from "@/utils/axios";

// Tạo sản phẩm mới
export const createProduct = async (values: ProductFormValues) => {
  const { data } = await instanceAxios.post("/products", values);
  return data;
};

// Lấy danh sách sản phẩm
export const getProducts = async () => {
  const { data } = await instanceAxios.get("/products");
  return data;
};

// Lấy 1 sản phẩm theo id
export const getProductById = async (id: number | string) => {
  const { data } = await instanceAxios.get(`/products/${id}`);
  return data;
};

// Cập nhật sản phẩm
export const updateProduct = async ({id,values,}: { id: string | number; values: Partial<ProductFormValues> }) => {
  const { data } = await instanceAxios.patch(`/products/${id}`, values);
  return data;
};

// Xóa mềm sản phẩm
export const softDeleteProduct = async (id: number | string) => {
  return updateProduct({ id, values: { isDeleted: true } });
};