import React from "react";

import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";

import Homeadmin from "@/pages/home";
import Category from "@/pages/Category/category";

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

import CommentList from "@/pages/comment/CommentList";
import ListAccountPage from "@/pages/account/ListAdminAccount";


import Login from "@/pages/auth/login";
import AddCategoryPage from "@/pages/Category/formadd";
import DeletedCategoryPage from "@/pages/Category/DeletedCategoryPage";
import EditCategoryPage from "@/pages/Category/edit";
import ProductDeletedList from "@/pages/Product/ProductDeletedList";
import OrderListPage from "@/pages/order/OrderListPage";
import BannerEditPage from "@/pages/banner/BannerEdit";
import ShippingMethodListPage from "@/pages/ShippingMethod/ShippingMethodListPage";
import OrderDetailPage from "@/pages/order/OrderDetailPage";



const AdminRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token && role === "admin") {
    return <Outlet />;
  }
  return <Navigate to="/auth/login" replace />;
};

// 👉 Export adminRouter
export const adminRouter = createBrowserRouter([
  {
    path: "/",
    children: [{ path: "auth/login", element: <Login /> }],
  },
  {
    path: "/admin",
    element: <AdminLayout />, // 👉 Đây là layout chính
    children: [
      {
        element: <AdminRoute />, // 👉 Route guard kiểm tra quyền
        children: [
          { index: true, element: <Homeadmin /> },
          { path: "categorys", element: <Category /> },
          { path: "categorys/add", element: <AddCategoryPage /> },
          { path: "categorys/edit/:id", element: <EditCategoryPage /> },
          { path: "categorys/deleted", element: <DeletedCategoryPage /> },
          { path: "products", element: <QuanLySanPham /> },
          { path: "products/add", element: <AddSanPham /> },
          { path: "products/deleted", element: <ProductDeletedList /> },
          { path: "products/edit/:id", element: <EditSanPham /> },
          { path: "products/details/:id", element: <ProductDetailPage /> },
          { path: "voucher", element: <VouchersPage /> },
          { path: "order", element: <OrderListPage /> },
          { path: "orders/:id", element: <OrderDetailPage /> },
      
          { path: "voucher/add", element: <VoucherFormPage /> },
          { path: "size", element: <SizeListPage /> },
          { path: "size/add", element: <SizeAddPage /> },
          { path: "size/edit/:id", element: <SizeEditPage /> },
          { path: "banners", element: <BannerListPage /> },
          { path: "banners/add", element: <BannerAddPage /> },
          { path: "banners/edit/:id", element: <BannerEditPage /> },
        
          { path: "comments", element: <CommentList /> },
          { path: "account", element: <ListAccountPage /> },
          { path: "shipping", element: <ShippingMethodListPage /> },
       
        ],
      },
    ],
  },
]);

