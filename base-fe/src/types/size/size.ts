export interface Size {
  id: number;
  name: string;
  description?: string;
  isDeleted: boolean; // true nếu đã xóa mềm, false nếu chưa xóa
  status: string; // "active" | "isDeleted"
  createdAt?: string;
  updatedAt?: string;
}