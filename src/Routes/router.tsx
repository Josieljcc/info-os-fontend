import AppLayout from "@/layout";
import DetailTechnician from "@/Pages/detailTechnicianPage";
import Home from "@/Pages/home";
import ListClient from "@/Pages/listClient";
import ListOrder from "@/Pages/listOrder";
import ListPart from "@/Pages/listPart";
import ListService from "@/Pages/listService";
import ListTechnician from "@/Pages/listTechnician";
import Login from "@/Pages/login";
import Order from "@/Pages/order";
import RegisterTechnician from "@/Pages/registerTechnician";
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
        path: "service",
        element: <ListService />,
      },
      {
        path: "technician/:id",
        element: <DetailTechnician />,
      },
    ],
  },
]);

export default router;
