import { RouterProvider } from "react-router-dom"
import { adminRouter } from "./router/AdminRouter"


function App() {
  return (
    <RouterProvider router={adminRouter} />
  )
}

export default App
