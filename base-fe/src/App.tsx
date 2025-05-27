import { useRoutes } from "react-router-dom";


import Login from "./pages/auth/login";
import Homeadmin from "./pages/home";
import Register from "./pages/auth/register";
import { ToastContainer } from "react-toastify";
import Category from "./pages/Category/category";
import EditCategoryPage from "./pages/Category/edit";
import QuanLySanPham from "./pages/san_pham/quan_ly_san_pham";
import AddSanPham from "./pages/san_pham/add_san_pham";
import EditSanPham from "./pages/san_pham/edit_san_pham";
import ProductDetailPage from "./pages/san_pham/chi_tiet_san_pham";

function App() {
  const router = useRoutes([
    {
      path: "/",
      children: [

        { path: "auth/login", element: <Login /> },
        { path: "auth/register", element: <Register /> },

        // Các route cần phân quyền
      ],
    },
    {
      path: "/admin",
      children: [
        {
          path: "dashboard",
          element:  <Homeadmin />,
        },
        {
          path: "categorys",
          element:  <Category />,
        },
        {
          path: "categorys/edit/:id",
          element:  <EditCategoryPage />,
        },
        {
          path: "products",
          element:  <QuanLySanPham />,
        },
        {
          path: "products/add",
          element:  <AddSanPham />,
        },
        {
          path: "products/edit/:id",
          element:  <EditSanPham />,
        },
        {
          path: "products/details/:id",
          element:  <ProductDetailPage />,
        },
       
       
      ],
    },
  ]);

  return <div>{router}
   <ToastContainer position="top-right" />
  </div>;
}

export default App;
