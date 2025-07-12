import technicianSchema, { registerTechnicianType } from "@/schemas/registerTechnician";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import useTechnician from "@/hook/useTechnician/useTechnician";
import InputList from "../imputList/imputList";
import { FORMS_USER_IMPUTS } from "@/constants";

const FormTechnician = () => {
  const { registerTechnician } = useTechnician();

  const methods = useForm<registerTechnicianType>({
    resolver: zodResolver(technicianSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const handleCreateTechnician = (data: registerTechnicianType) => {
    registerTechnician(data);
  };

    return (
    <div className="h-full flex flex-col gap-4 font-medium w-3/4 md:w-1/2">
      <FormProvider {...methods}>
        <InputList
          inputs={FORMS_USER_IMPUTS}
          errors={errors}
          inputClassName="py-6 text-xl placeholder-[#D4D4D8] text-[#D4D4D8]"
        />
        <div className="flex justify-center">
          <ButtonPrimary
            onClick={handleSubmit(handleCreateTechnician)}
            className="font-semibold text-2xl py-4 px-40 mt-10 mb-11"
          >
            Criar
          </ButtonPrimary>
        </div>
      </FormProvider>
    </div>
  );
};

export default FormTechnician;