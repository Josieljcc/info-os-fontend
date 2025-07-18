import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteButtonProps {
  onConfirm: () => void;
  label?: string;
  confirmMessage?: string;
}

const DeleteButton = ({
  onConfirm,
  label = "Excluir",
  confirmMessage = "Você deseja realmente excluir este registro?",
}: DeleteButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="bg-red-600 rounded-lg hover:bg-red-500 p-2 text-white font-bold flex items-center justify-center shadow-lg"
          disabled={loading}
        >
          <Trash2 size={18} />
          {label}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-zinc-800 text-white rounded-lg shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>{confirmMessage}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={loading}>
            {loading ? "Excluindo..." : "Sim, excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
