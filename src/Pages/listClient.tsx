import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import Spinner from "@/components/spinner/spinner";
import Card from "@/components/Card/Card";
import useAuthentication from "@/hook/useAuthentication";
import useClient from "@/hook/useClient";
import { Client } from "@/types";
import { useEffect, useState } from "react";

const ListClient = () => {
  // const [clients, setClients] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { getAllClients, isLoading, client, clients, fetchNextPage } =
    useClient();

  console.log(clients);

  useAuthentication();

  // useEffect(() => {
  //   const getClients = async () => {
  //     const pageSize = 5;
  //     const response = await getAllClients(currentPage, pageSize);

  //     if (response) {
  //       setClients(response.clients);
  //       setTotalPages(response.totalPages);
  //     }
  //   };
  //   getClients();
  // }, [currentPage]);

  if (isLoading) {
    return <Spinner />;
  }

  console.log(clients);

  return (
    <div className="h-screen bg-main-bg bg-cover overflow-hidden bg-center flex flex-col justify-center pt-24 px-8 pb-5 md:items-center">
      <h2 className="text-center pb-6 text-4xl font-bold text-white">
        Lista de Clientes
      </h2>
      {clients?.length === 0 ? (
        <div>
          <p>Nenhum cliente encontrado</p>
          <ButtonPrimary>Criar Cliente</ButtonPrimary>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3 md:flex-row md:gap-5">
            {clients?.map((client) => (
              <div>
                <Card key={client.id} item={client} />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span className="text-white flex justify-center items-center">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() =>
                // setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                fetchNextPage()
              }
              // disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Próximo
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ListClient;
