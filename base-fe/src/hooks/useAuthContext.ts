// hooks/useAuthContext.ts
import { useEffect, useState } from "react";

interface User {
  _id: string;
  fullName: string;
  email: string;
  admin: boolean;
  [key: string]: any;
}

export const useAuthContext = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<"admin" | "user">("user");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const roleData = localStorage.getItem("role") as "admin" | "user";

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
      setRole(roleData || "user");
    } else {
      setIsAuthenticated(false);
      setUser(null);
      setRole("user");
    }
  }, []);

  return { isAuthenticated, user, role };
};
