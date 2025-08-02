import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import { useState } from "react";
import PartDetailForm from "@/components/detailForm/partForm";
import { Part } from "@/types";
import EditPartForm from "../EditForm/editPartForm";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";

type DetailPart = {
  part: Part;
};

const DetailPart = ({ part }: DetailPart) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {isEditing ? (
        <EditPartForm part={part} setIsEditing={setIsEditing} />
      ) : (
        <div className="flex flex-col gap-4 p-4">
          <PartDetailForm part={part} />
          <ButtonPrimary onClick={handleEdit}>Editar</ButtonPrimary>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </div>
      )}
    </div>
  );
};

export default DetailPart;
