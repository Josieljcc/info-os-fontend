import { createBrowserRouter } from "react-router-dom";
import RegisterTechnician from "../Pages/registerTechnician";
import Login from "../Pages/login";

import Home from "@/Pages/home";
import Order from "@/Pages/order";
import ListTechnician from "@/Pages/listTechnician";
import ListClient from "@/Pages/listClient";

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
    path: "/technician",
    element: <ListTechnician />,
  },
  {
    path: "/client",
    element: <ListClient />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/technician",
    element: <ListTechnician />,
  },
]);

export default router;
