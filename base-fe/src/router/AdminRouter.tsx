
import AdminLayout from "@/layouts/AdminLayout";
import Category from "@/pages/Category/category";
import EditCategoryPage from "@/pages/Category/edit";
import AddAdminPage from "@/pages/account/AddAdminAccountPage";
import ListAccountPage from "@/pages/account/ListAdminAccount";
import ListAccountUsePage from "@/pages/account/ListUserAccountPage";
import CommentList from "@/pages/comment/CommentList";
import Homeadmin from "@/pages/home";
import AddSanPham from "@/pages/Product/ProductAdd";
import ProductDetailPage from "@/pages/Product/ProductDetail";
import EditSanPham from "@/pages/Product/ProductEdit";
import QuanLySanPham from "@/pages/Product/ProductList";
import SizeAddPage from "@/pages/size/AddSize";
import SizeListPage from "@/pages/size/ListSizePage";
import VoucherFormPage from "@/pages/vouchers/voucherFormPage";
import VouchersPage from "@/pages/vouchers/voucherPage";
import type { RouteObject } from "react-router-dom";


export const adminRouter: RouteObject = {
    path: "/admin", 
    element: <AdminLayout />,
    children: [
        { index: true, element: <Homeadmin /> },
      { path: "categorys", element: <Category /> },
      { path: "categorys/edit/:id", element: <EditCategoryPage /> },
      { path: "products", element: <QuanLySanPham /> },
      { path: "products/add", element: <AddSanPham /> },
      { path: "products/edit/:id", element: <EditSanPham /> },
      { path: "products/details/:id", element: <ProductDetailPage /> },
      { path: "voucher", element: <VouchersPage /> },
      { path: "voucher/add", element: <VoucherFormPage /> },
      { path: "size", element: <SizeListPage /> },
      { path: "size/add", element: <SizeAddPage /> },
      { path: "comments", element: <CommentList /> },
      { path: "account_admin", element: <ListAccountPage /> },
      { path: "account_admin/add", element: <AddAdminPage /> },
      { path: "account_user", element: <ListAccountUsePage /> },
    ],
  };
  