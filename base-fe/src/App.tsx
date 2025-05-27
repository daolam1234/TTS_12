import { useRoutes } from "react-router-dom";


import Login from "./pages/auth/login";
import Homeadmin from "./pages/home";
import Register from "./pages/auth/register";
import { ToastContainer } from "react-toastify";
import Category from "./pages/Category/category";
import EditCategoryPage from "./pages/Category/edit";

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
       
       
      ],
    },
  ]);

  return <div>{router}
   <ToastContainer position="top-right" />
  </div>;
}

export default App;
