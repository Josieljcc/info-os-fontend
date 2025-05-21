import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import ClientDetail from "@/components/clientDetail/clientDetail";
import EditClientForm from "@/components/editClientForm/editClientForm";
import Spinner from "@/components/spinner/spinner";
import useClient from "@/hook/useClient/useClient";
import { Client } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { useParams, Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const DetailClient = () => {
  const { id } = useParams();
  const { getClientById } = useClient();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { data: client, isFetching } = useQuery({
    queryKey: ["getClient"],
    queryFn: () => getClientById(id as string),
  });

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="h-screen bg-main-bg bg-cover overflow-hidden bg-center flex justify-center pt-24 px-8 pb-5 items-center text-white shadow-md">
      <div className=" h-[60%] md:w-1/2 max-w-[34.5rem] rounded-lg bg-secondaryColor flex flex-col p-10 pt-8 justify-between">
        <Link to="/client">
          <IoArrowBackCircleOutline className="h-8 w-8" />
        </Link>
        <div className="flex items-center gap-4">
          <RxAvatar className="h-16 w-16" />
          <div>
            <h1 className="font-medium text-lg">{client?.name}</h1>
            <p className="text-white/85 text-sm">{client?.email}</p>
          </div>
        </div>
        {isEditing ? (
          <EditClientForm
            client={client as Client}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <ClientDetail client={client} />
            <ButtonPrimary onClick={() => setIsEditing(!isEditing)}>
              Editar
            </ButtonPrimary>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailClient;
