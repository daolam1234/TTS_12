import { useRoutes } from "react-router-dom";


import Login from "./pages/auth/login";
import Homeadmin from "./pages/home";

function App() {
  const router = useRoutes([
    {
      path: "/",
      children: [

        { path: "auth/login", element: <Login /> },

        // Các route cần phân quyền
        {
          path: "admin/dashboard",
          element: (
           
              <Homeadmin />
       
          ),
        },
       
      ],
    },
    {
      path: "/admin",
      children: [
        {
          path: "dashboard",
          element: (
           
              <Homeadmin />
       
          ),
        },
       
      ],
    },
  ]);

  return <div>{router}</div>;
}

export default App;
