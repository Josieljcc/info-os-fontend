import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterTechnician from "../Pages/registerTechnician";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register/technician",
    element: <RegisterTechnician />,
  },
]);

export default router;
