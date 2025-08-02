import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import ClientDetailForm from "@/components/detailForm/clientForm";
import EditClientForm from "@/components/EditForm/editClientForm";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Client, Technician } from "@/types";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";

type DetailUserProps = {
  user: Client | Technician;
};

const DetailUserPage = ({ user }: DetailUserProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <div>
        <div className="flex items-center gap-4">
          <RxAvatar className="h-16 w-16" />
          <div>
            <h1 className="font-medium text-lg">{user?.name}</h1>
            <p className="text-white/85 text-sm">{user?.email}</p>
          </div>
        </div>
        {isEditing ? (
          <EditClientForm
            client={user as Client}
            setIsEditing={setIsEditing}
          />
        ) : (
          <div className="flex flex-col gap-4 p-4">
            <ClientDetailForm client={user as Client} />
            <ButtonPrimary onClick={handleEdit}>
              Editar
            </ButtonPrimary>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailUserPage;
