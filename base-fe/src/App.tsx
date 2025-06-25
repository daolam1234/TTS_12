import { useRoutes, Outlet } from "react-router-dom";
import Login from "./pages/auth/login";
import { adminRouter } from "./router/adminRouter";

function App() {
  const routes = useRoutes([
    {
      path: "/admin",
      element: <Outlet />,
      children: [
        { path: "login", element: <Login /> },
      ],
    },
    adminRouter, // route được bảo vệ
  ]);

  return routes;
}
export default App;
