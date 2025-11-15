import FormDrawer from "../formDrawer/formDrawer";
import FormOrder from "../formOrder/formOrder";

const DrawerOrderService = () => {
  return (
    <FormDrawer
      buttonTitle="Ordem de Serviço"
      title="Cadastrar Ordem de Serviço"
    >
      <FormOrder />
    </FormDrawer>
  );
};
export default DrawerOrderService;
