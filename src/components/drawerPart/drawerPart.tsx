import FormDrawer from "../formDrawer/formDrawer";
import FormPart from "../formPart/formPart";

const DrawerPart = () => {
  return (
    <FormDrawer buttonTitle="Nova Peça" title="Cadastrar Peça">
      <FormPart />
    </FormDrawer>
  );
};

export default DrawerPart;
