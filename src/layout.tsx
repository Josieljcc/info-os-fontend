import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./components/sideBar/sideBar";
import useAuthentication from "./hook/useAuthentication";
import { TitleMapType } from "./types";

const titleMap = {
  "/app/client": "Clientes",
  "/app/technician": "Técnicos",
  "/app": "Home",
  "/app/part": "Peças",
  "/app/service": "Serviços",
  "/app/equipment": "Equipamento",
};

const AppLayout = () => {
  useAuthentication();

  const { pathname } = useLocation();

  if (!pathname) {
    return;
  }
  return (
    <div className="bg-zinc-800 fixed w-full h-screen text-zinc-100">
      <header>header</header>
      <div className="flex">
        <SideBar />
        <div className="w-full md:px-6 ">
          <h1 className="font-semibold md:text-4xl text-2xl m-3">
            {titleMap[pathname as TitleMapType]}
          </h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
