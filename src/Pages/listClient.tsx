import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import Spinner from "@/components/spinner/spinner";
import Card from "@/components/Card/Card";
import useAuthentication from "@/hook/useAuthentication";
import useClient from "@/hook/useClient";
import { Client } from "@/types";
import { useEffect, useState } from "react";

const ListClient = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const { getAllClients, isLoading } = useClient();

  useAuthentication();

  useEffect(() => {
    const getClients = async () => {
      const client = await getAllClients();
      setClients(client as Client[]);
    };
    getClients();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="h-screen bg-main-bg bg-cover overflow-hidden bg-center flex flex-col justify-center pt-24 px-8 pb-5 md:items-center">
      <h2 className="text-center pb-6 text-4xl font-bold text-white">
        Lista de Clientes
      </h2>
      {clients?.length === 0 ? (
        <div>
          <p>Nenhum técnico encontrado</p>
          <ButtonPrimary>Criar Cliente</ButtonPrimary>
        </div>
      ) : (
        <div className="flex flex-col gap-3 md:flex-row md:gap-5">
          {clients?.map((client) => (
            <Card key={client.id} item={client} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListClient;
