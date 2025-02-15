import FormDrawer from "../formDrawer/formDrawer";
import FormEquipment from "../formEquipment/formEquipment";

const DrawerEquipment = () => {
  return (
    <FormDrawer buttonTitle="Equipment" title="Cadastrar Equipamento">
      <FormEquipment />
    </FormDrawer>
  );
};

export default DrawerEquipment;
