import { createBrowserRouter } from "react-router-dom";
import RegisterTechnician from "../Pages/registerTechnician";
import Login from "../Pages/login";

import Home from "@/Pages/home";
import Order from "@/Pages/order";
import ListTechnician from "@/Pages/listTechnician";
import ListClient from "@/Pages/listClient";
import DetailClient from "@/Pages/detailClientPage";
import ListPart from "@/Pages/listPart";
import ListOrder from "@/Pages/listOrder";
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
      {
        path: "os",
        element: <ListOrder />
      },
      {
        path: "part",
        element: <ListPart />
      },
      {
        path: "os",
        element: <ListOrder />
      },
      {
        path: "part",
        element: <ListPart />
      }
    ]
  },

]);

export default router;
