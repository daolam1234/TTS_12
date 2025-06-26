// hooks/useCategory.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import instanceAxios from "@/utils/axios"
import { categoryService } from "@/services/category"
import { message } from "antd"

export const useCategoryList = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await instanceAxios.get("/categories")
      return res.data.data.categories // CHÍNH XÁC: phải là .categories
    },
  })
}
export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: categoryService.create,
    onSuccess: () => {
      message.success("Thêm danh mục thành công")
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
    onError: () => {
      message.error("Thêm danh mục thất bại")
    },
  })
}
export const useDeletedCategoryList = () => {
  return useQuery({
    queryKey: ["deleted-categories"],
    queryFn: categoryService.getDeleted,
  })
}
