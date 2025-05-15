import { Button } from "@/components/ui/button"
import { useRoutes } from "react-router-dom"
import ClientLayout from "./layouts/ClientLayout"

function App() {

  const router = useRoutes([
    {
      path:'/',
      element: <ClientLayout/>
    }
  ])
  
  return (
    <div>{router}</div>
  )
}

export default App
