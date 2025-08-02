import { Client, role, Technician } from "@/types";
import { FiEdit3 } from "react-icons/fi";
import useClient from "@/hook/useClient/useClient";
import DeleteButton from "@/components/deleteButton/deleteButton";
import DetailModal from "../detailModal/userModal";

type CardProps = {
  item: Technician | Client;
  userType: role;
  classname?: string;
};

const Card = ({ item, userType, classname }: CardProps) => {
  const isClient = userType === role.client;

  const { deleteClient } = useClient({
    clientId: isClient ? (item as Client).id : undefined,
  });

  const handleDelete = async () => {
    if (isClient) {
      await deleteClient();
    }
  };

  return (
    <div
      className={`m-auto flex justify-between h-16 text-white rounded-2xl border-2 items-center w-full border-[#e9ecef7b] md:py-5 py-3 md:px-7 px-4 bg-secondaryColor ${classname}`}
    >
      <div className="flex flex-1 items-center">
        <p className="text-sm font-medium md:w-1/3 w-1/2">{item.name}</p>
        <p className="md:block hidden text-sm font-medium w-1/3">
          {item.email}
        </p>
        <p className="text-sm font-medium md:w-1/3 w-1/2">{item.phone}</p>
      </div>
      <div className="flex gap-2 h-7 items-center">
        <DetailModal
          icon={<FiEdit3 className="w-4 h-4" />}
          user={item as Client}
        />
        {isClient && (
          <DeleteButton userName={item.name} onConfirm={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default Card;
