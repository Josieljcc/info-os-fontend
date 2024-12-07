import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterTechnician from "../Pages/registerTechnician";
import Login from "../Pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register/technician",
    element: <RegisterTechnician />,
  },
]);

export default router;
