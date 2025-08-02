import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import DetailPartPage from "@/components/detailComponent/detailPart";
import { FiEdit3 } from "react-icons/fi";
import { Part } from "@/types";

type DetailModalPart ={
  part: Part
}

const DetailModalPart = ({part}:DetailModalPart) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="bg-mainColor p-2 rounded-lg">
        <FiEdit3 />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-secondaryColor text-gray-100">
        <AlertDialogTitle className="text-white">Detalhes</AlertDialogTitle>
        <AlertDialogHeader>
          <DetailPartPage part={part}/>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DetailModalPart;
