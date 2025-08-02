import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import { useState } from "react";

import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

import EquipmentDetailForm from "../detailForm/equipment";
import { Equipment } from "@/types";
import EditEquipmentForm from "../EditForm/editEquipment";

type DetailEquipment = {
  equipment: Equipment;
};

const DetailEquipment = ({ equipment }: DetailEquipment) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {isEditing ? (
        <EditEquipmentForm equipment={equipment} setIsEditing={setIsEditing} />
      ) : (
        <div className="flex flex-col gap-4 p-4">
          <EquipmentDetailForm equipment={equipment} />
          <ButtonPrimary onClick={handleEdit}>Editar</ButtonPrimary>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </div>
      )}
    </div>
  );
};

export default DetailEquipment;
