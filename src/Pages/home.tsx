import FormClient from "@/components/formClient/formClient";
import FormDrawer from "@/components/formDrawer/formDrawer";
import FormPart from "@/components/formPart/formPart";
import FormService from "@/components/formService/formService";
import useAuthentication from "@/hook/useAuthentication";
import { Link } from "react-router-dom";

const Home = () => {
  useAuthentication();

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
      <Link to={"/technician"}>Listar Técnicos</Link>
    </div>
  );
};

export default Home;
