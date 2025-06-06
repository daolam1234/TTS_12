
import { useRoutes } from "react-router-dom";
import { adminRouter } from "./router/AdminRouter";

function App() {
  const routes = useRoutes([adminRouter]); 
  return routes;
}
export default App;
