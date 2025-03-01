import DrawerClient from "@/components/drawerClient/drawerClient";
import DrawerEquipment from "@/components/drawerEquipment/drawerEquipment";
import DrawerPart from "@/components/drawerPart/drawerPart";
import DrawerService from "@/components/drawerService/drawerService";

import UserContext from "@/context/userContext";
import { role } from "@/types";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageUser =
      JSON.parse(localStorage.getItem("user") as string) || {};

    if (
      user.role === role.client ||
      localStorageUser?.role === role.client ||
      (!user.token && !localStorageUser.token)
    ) {
      navigate("/login");
    }

    setUser(localStorageUser);
  }, []);
  return (
    <div className="h-dvh flex flex-col w-full bg-[#141414] ">
      <h1>HOME</h1>
      <DrawerClient />
      <DrawerPart />
      <DrawerService />
      <DrawerEquipment />
      <Link className="text-white" to={"/order"}>
        Order
      </Link>
    </div>
  );
};

export default Home;
