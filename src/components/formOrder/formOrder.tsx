import orderSchema, { OrderType } from "@/schemas/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../input/input";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import InputSelect, { SelectType } from "../inputSelect/inputSelect";
import useFormOrder from "@/hook/useFormOrder";


const FormOrder = () => {
  
  const methods = useForm<OrderType>({ resolver: zodResolver(orderSchema) });

  const {clients, parts, 
    services, setClientId, 
    setSelectedPartId, setSelectedServiceId, 
    handleCreateOrder } = useFormOrder()

const {
    formState: { errors },
    handleSubmit,
  } = methods;

  return (
    <div>
      <FormProvider {...methods}>
        <Input
          formName="date"
          placeholder="Nome"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
        <Input
          formName="status"
          placeholder="Status"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
        <Input
          formName="comment"
          placeholder="Comentário"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.comment && (
          <p className="text-red-500 text-sm">{errors.comment.message}</p>
        )}
      </FormProvider>
      <InputSelect
        list={services as SelectType[]}
        placeholder="Serviços"
        setValue={setSelectedServiceId}
      />
        <InputSelect
        list={parts as SelectType[]}
        setValue={setSelectedPartId}
        placeholder="Peças"
      /> 
     <InputSelect
        list={clients}
        setValue={setClientId}
        placeholder="Cliente"
      />  
      <ButtonPrimary onClick={handleSubmit(handleCreateOrder)}>
        Criar
      </ButtonPrimary>
    </div>
  );
};

export default FormOrder;
