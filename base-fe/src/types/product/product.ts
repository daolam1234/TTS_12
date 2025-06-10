export  interface  Product  {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
  status: string;
  stock: number;
  date: string;
  image: string;
  isDeleted: boolean;
};
export interface ProductFormValues {
id:number | null; // Optional for new products
  name: string;
  productName: string; 
  size:string;
  createdAt: string;
  description: string;
  price: number;
  category: string;
  status: string;
  stock: number;
    image: string;
  
      isDeleted?: boolean;
 // Optional for file upload
}
