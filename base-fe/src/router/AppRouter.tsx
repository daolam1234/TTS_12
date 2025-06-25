// src/routes/AppRouter.tsx
import { useRoutes, Navigate, Outlet } from "react-router-dom";

import { authRouter } from "./authRouter";
import { useAuthStore } from "@/stores/auth"; // bạn cần tạo store auth hoặc context
import { adminRouter } from "./adminRouter";


const ProtectedRoute = () => {
  const { token } = useAuthStore(); // hoặc context chứa token

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const AppRouter = () => {
  const routes = useRoutes([
    authRouter,
    {
      path: "/admin",
      element: <ProtectedRoute />,
      children: [adminRouter],
    },
    {
      path: "*",
      element: <Navigate to="/admin" />,
    },
  ]);

  return routes;
};

export default AppRouter;
