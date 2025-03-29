import FormOrder from "@/components/formOrder/formOrder";
import useAuthentication from "@/hook/useAuthentication";


const Order = () => {
  useAuthentication()
  
  return <FormOrder />;
};

export default Order;
