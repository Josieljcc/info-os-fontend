import FormDrawer from "../formDrawer/formDrawer";
import FormService from "../formService/formService";

const DrawerService = () => {
  return (
    <FormDrawer buttonTitle="Service" title="Cadastrar Serviço">
      <FormService />
    </FormDrawer>
  );
};

export default DrawerService;
