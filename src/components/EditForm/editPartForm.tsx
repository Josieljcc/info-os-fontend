import { Part } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import FormField from "../formField/formField";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import usePart from "@/hook/usePart/usePart";
import partSchema, { PartType } from "@/schemas/parts";

type EditPartFormProps = {
  part: Part;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditPartForm = ({ part, setIsEditing }: EditPartFormProps) => {
  const { editPartMutation } = usePart({ partId: part?.id });
  const methods = useForm<PartType>({
    resolver: zodResolver(partSchema),
  });

  const { handleSubmit, reset } = methods;

  const handleEditPart = (data: PartType) => {
    editPartMutation.mutate(data);
    setIsEditing(false);
  };

  useEffect(() => {
    if (part) {
      reset({
        name: part.name,
        quantity: String(part.quantity),
        price: String(part.price),
        description: part.description,
      });
    }
  }, [part, reset]);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4">
        <FormField formName="name" label="Nome:" />
        <FormField formName="quantity" label="Quantidade:" />
        <FormField formName="price" label="Preço:" />
        <FormField formName="description" label="Descrição" />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <ButtonPrimary onClick={handleSubmit(handleEditPart)}>
          Salvar
        </ButtonPrimary>
        <AlertDialogCancel
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background 
          transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none 
          disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background 
          hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-2 sm:mt-0"
        >
          Cancelar
        </AlertDialogCancel>
      </div>
    </FormProvider>
  );
};

export default EditPartForm;
