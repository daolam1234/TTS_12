import { useRoutes } from "react-router-dom";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

export default function AppRouter() {
  return useRoutes([
    {
      path: "/",
      children: [
        { path: "auth/login", element: <Login /> },
        { path: "auth/register", element: <Register /> },
      ],
    },
    
  ]);
}


