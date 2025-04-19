import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import Spinner from "@/components/spinner/spinner";
import Card from "@/components/Card/Card";
import useAuthentication from "@/hook/useAuthentication";
import useClient from "@/hook/useClient";
import { Client } from "@/types";
import { Link } from "react-router-dom";

const ListClient = () => {
  const { isLoading, clients, fetchNextPage } = useClient();
  useAuthentication();

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
          <p>Nenhum cliente encontrado</p>
          <ButtonPrimary>Criar Cliente</ButtonPrimary>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:justify-center gap-3 md:flex-row md:flex-wrap md:gap-5 overflow-scroll">
            {clients?.map((client) => (
              <Link to={`/client/${client?.id}`}>
                <Card key={client?.id} item={client as Client} />
              </Link>
            ))}
          </div>
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => fetchNextPage()}
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
