import FormClient from "@/components/formClient/formClient";
import FormDrawer from "@/components/formDrawer/formDrawer";
import FormEquipment from "@/components/formEquipment/formEquipment";
import FormPart from "@/components/formPart/formPart";
import FormService from "@/components/formService/formService";

import UserContext from "@/context/userContext";
import { role } from "@/types";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="h-screen flex flex-col w-full bg-[#141414] ">
      <h1>HOME</h1>
      <FormDrawer buttonTitle="Cliente" title="Cadastrar Cliente">
        <FormClient />
      </FormDrawer>
      <FormDrawer buttonTitle="Peça" title="Cadastrar Peça">
        <FormPart />
      </FormDrawer>
      <FormDrawer buttonTitle="Service" title="Cadastrar Serviço">
        <FormService />
      </FormDrawer>
      <FormDrawer buttonTitle="Equipment" title="Cadastrar Equipamento">
        <FormEquipment/>
      </FormDrawer>
    </div>
  );
};

export default Home;
