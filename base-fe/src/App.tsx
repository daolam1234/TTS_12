import { Button } from "@/components/ui/button"
import { useRoutes } from "react-router-dom"
import ClientLayout from "./layouts/ClientLayout"
import Layoutadmin from "./layouts/AdminLayout"

function App() {

  const router = useRoutes([
    {
      path:'/',
      element: <ClientLayout/>
    },
    {
      path:'/admin',
      element: <Layoutadmin/>
    },
  ])
  
  return (
    <div>{router}</div>
  )
}

export default App
