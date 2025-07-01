import instanceAxios from "@/utils/axios";

export interface Discount {
  _id: string;
  code: string;
  discount_percent: number;
  start_date: string;
  end_date: string;
  is_unlimited: boolean;
  max_uses: number;
  createdAt: string;
  updatedAt: string;
}

// Tạo mới
export const createDiscount = async (payload: {
  code: string;
  discount_percent: number;
  start_date: string;
  end_date: string;
  is_unlimited: boolean;
  max_uses: number;
}) => {
  const res = await instanceAxios.post("/coupon", payload);
  return res.data.data as Discount;
};

// Lấy danh sách
export const getDiscounts = async () => {
  const res = await instanceAxios.get("/coupon");
  return res.data.data as Discount[];
};

// Xoá
export const deleteDiscount = async (id: string) => {
  const res = await instanceAxios.delete(`/coupon/${id}`);
  return res.data;
};
export const getDiscountById = async (id: string) => {
    const res = await instanceAxios.get(`/coupon/${id}`);
    return res.data.data as Discount;
  };
// Cập nhật
export const updateDiscount = async (
  id: string,
  payload: Partial<Omit<Discount, "_id" | "createdAt" | "updatedAt">>
) => {
  const res = await instanceAxios.put(`/coupon/${id}`, payload);
  return res.data.data as Discount;
};
