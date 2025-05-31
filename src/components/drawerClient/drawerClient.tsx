import FormClient from "../formClient/formClient";
import FormDrawer from "../formDrawer/formDrawer";

const DrawerClient = () => {
  return (
    <FormDrawer buttonTitle="Novo Cliente" title="Cadastrar Cliente">
      <FormClient />
    </FormDrawer>
  );
};

export default DrawerClient;
