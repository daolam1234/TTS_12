import instanceAxios from "@/utils/axios";

export const productService = {
  getAll: async (params?: Record<string, any>) => {
    const res = await instanceAxios.get("/products", { params });
    return res.data?.data || [];
  },

  getById: async (id: string) => {
    const res = await instanceAxios.get(`/products/${id}`);
    return res.data; // { success, data: { product }, message }
  },

  create: async (data: any) => {
    const formData = new FormData();

    // ✅ Thông tin cơ bản
    if (data.title) formData.append("title", data.title);
    if (data.slug) formData.append("slug", data.slug);
    if (data.price !== undefined) formData.append("price", data.price.toString());
    if (data.description) formData.append("description", data.description);
    if (data.product_category_id) formData.append("product_category_id", data.product_category_id);
    formData.append("discountPercentage", (data.discountPercentage ?? 0).toString());
    formData.append("position", (data.position ?? 0).toString());

    // ✅ Ảnh thumbnails (gửi url text)
    (data.thumbnails || []).forEach((url: string, i: number) => {
      formData.append(`thumbnails[${i}]`, url);
    });

    // ✅ Variants
    (data.variants || []).forEach((variant: any, i: number) => {
      if (variant.size) formData.append(`variants[${i}][size]`, variant.size);
      formData.append(`variants[${i}][stock]`, String(variant.stock ?? 0));
      formData.append(`variants[${i}][price]`, String(variant.price ?? 0));
      formData.append(`variants[${i}][price_discount]`, String(variant.price_discount ?? 0));

      // Ảnh variant
      (variant.thumbnails || []).forEach((url: string, j: number) => {
        formData.append(`variants[${i}][images][${j}]`, url);
      });

      // Attributes nếu có
      (variant.attributes || []).forEach((attr: any, k: number) => {
        if (attr.attribute_id)
          formData.append(`variants[${i}][attributes][${k}][attribute_id]`, attr.attribute_id);
        if (attr.value)
          formData.append(`variants[${i}][attributes][${k}][value]`, attr.value);
      });
    });

    const res = await instanceAxios.post("/products", formData);
    return res.data; // { success, data, message }
  },

  update: async (id: string, data: any) => {
    const res = await instanceAxios.put(`/products/${id}`, data);
    return res.data;
  },

  softDelete: async (id: string) => {
    const res = await instanceAxios.delete(`/products/soft-delete/${id}`);
    return res.data;
  },

  getDeletedProducts: async (page = 1, limit = 10) => {
    const res = await instanceAxios.get(`/products/get-deleted`, {
      params: { page, limit },
    });
    return res.data?.data || [];
  },

  restore: async (id: string) => {
    const res = await instanceAxios.patch(`/products/restore/${id}`);
    return res.data;
  },
};
