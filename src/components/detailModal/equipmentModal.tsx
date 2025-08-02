import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { FiEdit3 } from "react-icons/fi";
import { Equipment } from "@/types";
import DetailEquipment from "../detailComponent/detailEquipment";

type DetailModalEquipment = {
  equipment: Equipment;
};

const DetailModalEquipment = ({ equipment }: DetailModalEquipment) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="bg-mainColor p-2 rounded-lg">
        <FiEdit3 />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-secondaryColor text-gray-100">
        <AlertDialogTitle className="text-white">Detalhes</AlertDialogTitle>
        <AlertDialogHeader>
          <DetailEquipment equipment={equipment} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DetailModalEquipment;
