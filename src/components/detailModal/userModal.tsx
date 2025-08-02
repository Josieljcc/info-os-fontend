import { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { Client, Technician } from "@/types";
import DetailUserPage from "@/components/detailComponent/detailUser";

type detailModalProps = {
    icon?: React.ReactNode
    user?: Client | Technician
}

const DetailModal = ({ icon, user }: detailModalProps) => {
    const [open, setOpen] = useState(false)

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className="bg-mainColor p-2 rounded-lg">{icon}</AlertDialogTrigger>
            <AlertDialogContent className="bg-secondaryColor text-gray-100">
                <AlertDialogTitle className="text-white">Detalhes</AlertDialogTitle>
                <AlertDialogHeader>
                    <DetailUserPage
                        user={user as Client} />
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DetailModal