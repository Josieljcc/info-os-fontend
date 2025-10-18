import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import ButtonPrimary from "../buttonPrimary/buttonPrimary";
import FormField from "../formField/formField";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import orderSchema, { OrderType } from "@/schemas/order";
import { OrderResponse, Service } from "@/types";
import { ClientSearchDropdown } from "../ClientSearchDropdown/ClientSearchDropdown";
import { MultiSelectServicesDropdown } from "../MultiSelectDropdown/multiSelectDropdown";
import InputSelect, { SelectType } from "../inputSelect/inputSelect";
import useGetTechnician from "@/hook/useTechnician/useGetTechnician";
import useEditOrderService from "@/hook/useOrderService/useEditeOrderService";

type EditOrderFormProps = {
  order: OrderResponse;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditOrderForm = ({ order, setIsEditing }: EditOrderFormProps) => {
  const { editOrderMutation } = useEditOrderService({ orderId: order?.id });
  const methods = useForm<OrderType>({
    resolver: zodResolver(orderSchema),
  });
  const { handleSubmit, reset } = methods;

  const { technicians } = useGetTechnician();

  const [selectedTechnicianId, setSelectedTechnicianId] = useState<number>();
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const handleEditOrder = (data: OrderType) => {
    const payload = {
      ...data,
      openingDate: formatDateToISO(data.openingDate || ""),
      forecastDate: formatDateToISO(data.forecastDate || ""),
      closingDate: data.closingDate ? formatDateToISO(data.closingDate) : null,
      technicianId: String(selectedTechnicianId ?? order.technician.id),
      clientId: String(order.client.id),
      services: selectedServices.length ? selectedServices : order.services,
      parts: order.parts.map((part) => ({
        name: part.name,
        description: part.description,
        price: String(part.price),
        quantity: String(part.quantity),
      })),
    };

    editOrderMutation.mutate(payload);
    setIsEditing(false);
  };

  // Função para converter data para formato brasileiro (dd/mm/aaaa)
  const formatDateToBrazilian = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Função para converter data do formato brasileiro para ISO
  const formatDateToISO = (dateString: string) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  useEffect(() => {
    if (order) {
      reset({
        openingDate: formatDateToBrazilian(order.openingDate),
        forecastDate: formatDateToBrazilian(order.forecastDate),
        closingDate: order.closingDate
          ? formatDateToBrazilian(order.closingDate)
          : "",
        status: order.status,
        comment: order.comment,
      });
      setSelectedTechnicianId(order.technician.id);
      setSelectedServices(order.services);
    }
  }, [order, reset]);

  return (
    <FormProvider {...methods}>
      <div className="max-h-[70vh] lg:max-h-none overflow-y-auto lg:overflow-visible">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Coluna 1 - Datas e Status */}
          <div className="flex flex-col gap-4 lg:w-1/2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
              <FormField formName="openingDate" label="Data de Abertura:" />
              <FormField
                formName="forecastDate"
                label="Previsão de Conclusão:"
              />
              <FormField formName="closingDate" label="Data de Fechamento:" />
            </div>
            <FormField formName="status" label="Status:" />
            <FormField formName="comment" label="Comentário:" />
          </div>

          {/* Coluna 2 - Cliente, Técnico e Serviços */}
          <div className="flex flex-col gap-4 lg:w-1/2">
            <ClientSearchDropdown />

            <InputSelect
              list={technicians as SelectType[]}
              setValue={setSelectedTechnicianId}
              placeholder="Selecione Técnico"
            />

            <MultiSelectServicesDropdown />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 p-4 mt-6">
        <ButtonPrimary onClick={handleSubmit(handleEditOrder)}>
          Salvar
        </ButtonPrimary>
        <AlertDialogCancel className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md">
          Cancelar
        </AlertDialogCancel>
      </div>
    </FormProvider>
  );
};

export default EditOrderForm;
