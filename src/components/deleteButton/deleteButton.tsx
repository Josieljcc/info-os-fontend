import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";

type DeleteButtonProps = {
  onConfirm: () => void;
  name: string;
  typeLabel: string;
};

const DeleteButton = ({ onConfirm, name, typeLabel }: DeleteButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    onConfirm();
    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="bg-red-600 rounded-lg hover:bg-red-500 p-2 text-white flex items-center justify-center shadow-lg"
          disabled={loading}
        >
          <Trash2 size={16} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-zinc-800 text-white rounded-lg shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirmar a exclusão {typeLabel} {name}?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 hover:bg-red-500"
          >
            {loading ? "Excluindo..." : "Excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
