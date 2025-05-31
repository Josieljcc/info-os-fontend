import AppLayout from "@/layout";
import DetailClient from "@/Pages/detailClientPage";
import DetailTechnician from "@/Pages/detailTechnicianPage";
import ListClient from "@/Pages/listClient";
import ListOrder from "@/Pages/listOrder";
import ListPart from "@/Pages/listPart";
import ListTechnician from "@/Pages/listTechnician";
import Login from "@/Pages/login";
import Order from "@/Pages/order";
import RegisterTechnician from "@/Pages/registerTechnician";
import { Home } from "lucide-react";
import { createBrowserRouter } from "react-router-dom";

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
        element: <Home />,
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
        element: <ListOrder />,
      },
      {
        path: "part",
        element: <ListPart />,
      },
      {
        path: "os",
        element: <ListOrder />,
      },
      {
        path: "part",
        element: <ListPart />,
      },
      {
        path: "technician/:id",
        element: <DetailTechnician />,
      },
    ],
  },
]);

export default router;
