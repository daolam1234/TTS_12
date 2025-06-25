// src/routes/authRouter.tsx

import Login from "@/pages/auth/login";
import type { RouteObject } from "react-router-dom";

export const authRouter: RouteObject = {
  path: "/login",
  element: <Login />,
};
