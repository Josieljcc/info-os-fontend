import FormClient from "@/components/formClient/formClient";
import FormDrawer from "@/components/formDrawer/formDrawer";
import FormPart from "@/components/formPart/formPart";

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
    <div className="h-screen w-full bg-[#141414] ">
      <h1>HOME</h1>
      <FormDrawer buttonTitle="Cliente" title="Cadastrar Cliente">
        <FormClient />
      </FormDrawer>
      <FormDrawer buttonTitle="Peças" title="Cadastrar Peças">
        <FormPart />
      </FormDrawer>
    </div>
  );
};

export default Home;
