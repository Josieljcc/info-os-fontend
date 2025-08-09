import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { FiEdit3 } from "react-icons/fi";
import { Service } from "@/types";
import DetailService from "../detailComponent/detailService";

type DetailModalService = {
  service: Service;
};

const DetailModalService = ({ service }: DetailModalService) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="bg-mainColor p-2 rounded-lg">
        <FiEdit3 />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-secondaryColor text-gray-100">
        <AlertDialogTitle className="text-white">Detalhes</AlertDialogTitle>
        <AlertDialogHeader>
          <DetailService service={service} />
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DetailModalService;
