import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";

import Homeadmin from "@/pages/home";
import Category from "@/pages/Category/category";
import EditCategoryPage from "@/pages/Category/edit";
import QuanLySanPham from "@/pages/Product/ProductList";
import AddSanPham from "@/pages/Product/ProductAdd";
import EditSanPham from "@/pages/Product/ProductEdit";
import ProductDetailPage from "@/pages/Product/ProductDetail";
import VouchersPage from "@/pages/vouchers/voucherPage";
import VoucherFormPage from "@/pages/vouchers/voucherFormPage";
import SizeListPage from "@/pages/size/ListSizePage";
import SizeAddPage from "@/pages/size/AddSize";
import SizeEditPage from "@/pages/size/EditSize";
import BannerListPage from "@/pages/banner/BannerList";
import BannerAddPage from "@/pages/banner/BannerAdd";
import BannerEditPage from "@/pages/banner/BannerEdit";
import CommentList from "@/pages/comment/CommentList";
import ListAccountPage from "@/pages/account/ListAdminAccount";
import AddAdminPage from "@/pages/account/AddAdminAccountPage";
import ListAccountUsePage from "@/pages/account/ListUserAccountPage";

import { useAuthContext } from "@/hooks/useAuthContext";
import type { ReactNode } from "react";
import Login from "@/pages/auth/login";

// Component bảo vệ route admin
function AdminPrivateRoute({ children }: { children?: ReactNode }) {
  const { isAuthenticated, user } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!user?.admin) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}

// 👉 Export adminRouter
export const adminRouter = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "auth/login", element: <Login /> },
    ],
  },
{
  path: "/admin",
  element: (
    <AdminPrivateRoute>
      <AdminLayout />
    </AdminPrivateRoute>
  ),
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
    { path: "size/edit/:id", element: <SizeEditPage /> },
    { path: "banners", element: <BannerListPage /> },
    { path: "banners/add", element: <BannerAddPage /> },
    { path: "banners/edit/:id", element: <BannerEditPage /> },
    { path: "comments", element: <CommentList /> },
    { path: "account_admin", element: <ListAccountPage /> },
    { path: "account_admin/add", element: <AddAdminPage /> },
    { path: "account_user", element: <ListAccountUsePage /> },
  ],
},
]);