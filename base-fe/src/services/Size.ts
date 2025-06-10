import instanceAxios from "@/utils/axios";
import type { SizeFormValues } from "@/types/size/size";

// Tạo mới
export const createSize = async (values: SizeFormValues) => {
  const { data } = await instanceAxios.post("/sizes", values);
  return data;
};

// Danh sách
export const getSizes = async () => {
  const { data } = await instanceAxios.get("/sizes");
  return data;
};

// Theo id
export const getSizeById = async (id: number | string) => {
  const { data } = await instanceAxios.get(`/sizes/${id}`);
  return data;
};

// Cập nhật
export const updateSize = async ({
  id,
  values,
}: {
  id: string | number;
  values: Partial<SizeFormValues>;
}) => {
  const { data } = await instanceAxios.patch(`/sizes/${id}`, values);
  return data;
};

// Xoá mềm
export const softDeleteSize = async (id: number | string) => {
  return updateSize({ id, values: { isDeleted: true } });
};
