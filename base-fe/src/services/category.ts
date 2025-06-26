import instanceAxios from "../utils/axios"

export interface Category {
  _id: string
  title: string
  description: string
  parent_id: string | null
  status: string
  position: number
  thumbnails: string
  deleted: boolean
  createdAt: string
  updatedAt: string
}

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const res = await instanceAxios.get("/categories")
    return res.data?.data?.categories || []
  },
  create: async (data: Category) => {
    const res = await instanceAxios.post("/categories", data)
    return res.data.data
  },

  update: async (id: string, data: Category) => {
    return await instanceAxios.put(`/categories/${id}`, data)
  },
  
  getById: async (id: string) => {
    return await instanceAxios.get(`/categories/${id}`)
  },
  softDelete: async (id: string) => {
    const res = await instanceAxios.delete(`/categories/${id}`)
    return res.data
  },
  getDeleted: async () => {
    const res = await instanceAxios.get("/categories/deleted") 
    return res.data.data.categories || []
  },
  restore: async (id: string) => {
    return await instanceAxios.patch(`categories/${id}/restore`)
  },
  
  forceDelete: async (id: string) => {
    return await instanceAxios.delete(`/categories/${id}/hard`)
  }
}
export const createCategory = async (data: Partial<Category>) => {
  const res = await instanceAxios.post("/categories", data)
  return res.data
}