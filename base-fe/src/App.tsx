import { Button } from "@/components/ui/button"
import { useRoutes } from "react-router-dom"

function App() {

  const router = useRoutes([
    {
      path:'/',
      element: <div>home</div>
    }
  ])
  
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
      {router}
    </div>
  )
}

export default App
