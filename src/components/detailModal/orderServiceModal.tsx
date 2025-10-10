import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { FiEdit3 } from "react-icons/fi";
import { OrderResponse } from "@/types";
import { formatDateBR } from "@/lib/utils";
import EditOrderForm from "../EditForm/editOrderForm";
type DetailModalOrderServiceProps = { order: OrderResponse };
const DetailModalOrderService = ({ order }: DetailModalOrderServiceProps) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="bg-mainColor p-2 rounded-lg">
        <FiEdit3 />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-secondaryColor text-gray-100">
        <AlertDialogTitle className="text-white">
          {isEditing ? "Editar Ordem de Serviço" : "Detalhes da OS"}
        </AlertDialogTitle>
        <AlertDialogHeader>
          {isEditing ? (
            <EditOrderForm order={order} setIsEditing={setIsEditing} />
          ) : (
            <div className="flex flex-col gap-4 p-4">
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Data Abertura:</strong>
                {formatDateBR(order.openingDate)}
              </p>
              <p>
                <strong>Previsão:</strong> {formatDateBR(order.forecastDate)}
              </p>
              <p>
                <strong>Comentário:</strong> {order.comment}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-mainColor text-white px-4 py-2 rounded-md"
              >
                Editar
              </button>
            </div>
          )}
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DetailModalOrderService;
