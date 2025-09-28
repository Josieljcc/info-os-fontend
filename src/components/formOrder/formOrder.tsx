import orderSchema, { OrderType } from "@/schemas/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../input/input";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";

import useFormOrder from "@/hook/useFormOrder/useFormOrder";
import { ClientSearchDropdown } from "../ClientSearchDropdown/ClientSearchDropdown";
import { MultiSelectServicesDropdown } from "../MultiSelectDropdown/multiSelectDropdown";
import MultiSelectPart from "../MultiSelectDropdown/multiSelectPart";
import DatePicker from "../datePicker/datePicker";

const FormOrder = () => {
  const methods = useForm<OrderType>({ resolver: zodResolver(orderSchema) });

  const { handleCreateOrder } = useFormOrder();

  const {
    formState: { errors },
    handleSubmit,
  } = methods;

  return (
    <div>
      <FormProvider {...methods}>
        <Input
          formName="comment"
          placeholder="Comentário"
          className="py-8 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        {errors.comment && (
          <p className="text-red-500 text-sm">{errors.comment.message}</p>
        )}
        <DatePicker />
        <MultiSelectServicesDropdown />
        <MultiSelectPart />
        <ClientSearchDropdown />
        <ButtonPrimary onClick={handleSubmit(handleCreateOrder)}>
          Criar
        </ButtonPrimary>
      </FormProvider>
    </div>
  );
};

export default FormOrder;
