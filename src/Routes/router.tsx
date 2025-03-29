import { createBrowserRouter } from "react-router-dom";
import RegisterTechnician from "../Pages/registerTechnician";
import Login from "../Pages/login";

import Home from "@/Pages/home";
import Order from "@/Pages/order";
import ListTechnician from "@/Pages/listTechnician";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterTechnician />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register/technician",
    element: <RegisterTechnician />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/technician",    
    element: <ListTechnician/>,
  }
]);

export default router;
