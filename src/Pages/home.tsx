import DrawerClient from "@/components/drawerClient/drawerClient";
import DrawerEquipment from "@/components/drawerEquipment/drawerEquipment";
import DrawerPart from "@/components/drawerPart/drawerPart";
import DrawerService from "@/components/drawerService/drawerService";
import useAuthentication from "@/hook/useAuthentication";
import { Link } from "react-router-dom";

const Home = () => {
  useAuthentication();

  return (
    <div className="h-dvh flex flex-col w-full bg-[#141414] ">
      <h1>HOME</h1>
      <DrawerClient />
      <DrawerPart />
      <DrawerService />
      <DrawerEquipment />
      <Link className="text-white" to="/technician">
        Listar Técnicos
      </Link>
    </div>
  );
};

export default Home;
