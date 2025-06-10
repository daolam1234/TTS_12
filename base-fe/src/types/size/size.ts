export interface Size {
  id: number | string;
  name: string;
  createdAt: string;
  updatedAt: string;
  isDeleted?: boolean;
}

export interface SizeFormValues {
  name: string;
  isDeleted?: boolean;
}