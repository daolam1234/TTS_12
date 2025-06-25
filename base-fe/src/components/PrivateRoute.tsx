// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth";

const PrivateRoute = () => {
  const { token, user, isAuthenticated, rehydrate } = useAuthStore();

  useEffect(() => {
    rehydrate(); // load lại dữ liệu từ localStorage
  }, []);

  // Nếu chưa login hoặc không phải admin → chặn
  if (!isAuthenticated || !token || !user?.admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
