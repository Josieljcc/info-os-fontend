import { createBrowserRouter } from "react-router-dom";
import RegisterTechnician from "../Pages/registerTechnician";
import Login from "../Pages/login";

import Home from "@/Pages/home";
import Order from "@/Pages/order";
import ListTechnician from "@/Pages/listTechnician";
import ListClient from "@/Pages/listClient";
import DetailClient from "@/Pages/detailClientPage";
import AppLayout from "@/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RegisterTechnician />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "app",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "technician",
        element: <ListTechnician />,
      },
      {
        path: "client",
        element: <ListClient />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "technician",
        element: <ListTechnician />,
      },
      {
        path: "client/:id",
        element: <DetailClient />,
      },
    ]
  },

]);

export default router;
