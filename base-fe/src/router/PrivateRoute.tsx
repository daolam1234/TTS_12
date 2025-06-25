import { Navigate, Outlet } from "react-router-dom";
import { Spin } from "antd";
import { useAuthStore } from "@/stores/auth";

const PrivateRoute = () => {
  const { token, user } = useAuthStore();

  if (!token || !user?.admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
