// Dữ liệu banner gửi lên từ form thêm / sửa
export interface BannerFormValues {
  title: string;
  image: string;
  mota?: string;
  isDeleted?: boolean;
}

// Dữ liệu banner nhận từ API (bao gồm ID và các field hệ thống)
export interface Banner extends BannerFormValues {
  id: string | number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  
}