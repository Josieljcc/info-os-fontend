import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import ClientDetail from "@/components/clientDetail/clientDetail";
import EditClientForm from "@/components/editClientForm/editClientForm";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Client, Technician } from "@/types";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import useClient from "@/hook/useClient/useClient";
import DeleteButton from "@/components/deleteButton/deleteButton";


type DetailUserProps = {
  user: Client | Technician;
};

const DetailUser = ({ user }: DetailUserProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

const { deleteClient } = useClient({ clientId: user.id });  
  const handleDelete = async () => {
    await deleteClient(user.id);
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
            <ClientDetail client={user as Client} />
            <ButtonPrimary onClick={handleEdit}>
              Editar
            </ButtonPrimary>
            <DeleteButton onConfirm={handleDelete} />
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailUser;
