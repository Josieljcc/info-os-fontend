import FormDrawer from "../formDrawer/formDrawer";
import FormTechnician from "../formTechnician/formTechnician";

const DrawerTechnician = () => {
  return (
    <FormDrawer buttonTitle="Novo Técnico" title="Cadastrar Técnico">
      <FormTechnician />
    </FormDrawer>
  );
};

export default DrawerTechnician;
