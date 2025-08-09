import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import { useState } from "react";

import { Service } from "@/types";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import ServiceDetailForm from "../detailForm/serviceForm";
import EditServiceForm from "../EditForm/editServiceForm";

type DetailService = {
  service: Service;
};

const DetailService = ({ service }: DetailService) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {isEditing ? (
        <EditServiceForm service={service} setIsEditing={setIsEditing} />
      ) : (
        <div className="flex flex-col gap-4 p-4">
          <ServiceDetailForm service={service} />
          <ButtonPrimary onClick={handleEdit}>Editar</ButtonPrimary>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </div>
      )}
    </div>
  );
};

export default DetailService;
