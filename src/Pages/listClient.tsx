import { useState } from "react";
import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import Spinner from "@/components/spinner/spinner";
import Card from "@/components/Card/Card";
import useAuthentication from "@/hook/useAuthentication";
import { Client } from "@/types";
import useClient from "@/hook/useClient/useClient";
import { SearchField } from "@/hook/useClient/types";

const ListClient = () => {
  const { isLoading, clients, fetchNextPage, getClientBySearch } = useClient();

  useAuthentication();

  const [searchType, setSearchType] = useState<SearchField>("name");
  const [searchValue, setSearchValue] = useState("");
  const [filteredClients, setFilteredClients] = useState<Client[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    setIsSearching(true);

    const searchParams: any = { [searchType]: searchValue };
    const results = await getClientBySearch(searchParams);
    setFilteredClients(results ?? []);
    setIsSearching(false);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setFilteredClients(null);
  };

  if (isLoading || isSearching) {
    return <Spinner />;
  }

  const displayClients = filteredClients ?? clients;

  return (
    <div className="min-h-screen bg-main-bg bg-cover overflow-hidden bg-center flex flex-col justify-start pt-24 px-8 pb-5 md:items-center">
      <h2 className="text-center pb-6 text-4xl font-bold text-white">
        Lista de Clientes
      </h2>

      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <select
          value={searchType}
          onChange={(e) =>
            setSearchType(e.target.value as "name" | "email" | "phone")
          }
          className="px-4 py-2 rounded-md"
        >
          <option value="name">Nome</option>
          <option value="email">Email</option>
          <option value="phone">Telefone</option>
        </select>
        <input
          type={searchType === "phone" ? "number" : "text"}
          placeholder={`Buscar por ${searchType}`}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="px-4 py-2 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
        {filteredClients && (
          <button
            onClick={handleClearSearch}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Limpar Busca
          </button>
        )}
      </div>

      {displayClients?.length === 0 ? (
        <div className="text-white text-center">
          <p>Nenhum cliente encontrado</p>
          <div className="mt-4">
            <ButtonPrimary>Criar Cliente</ButtonPrimary>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:justify-center gap-3 md:flex-row md:flex-wrap md:gap-5 overflow-scroll md:overflow-hidden max-h-[60vh]">
            {displayClients?.map((client) => (
              <Card key={client?.id} item={client as Client} />
            ))}
          </div>

          {!filteredClients && (
            <div className="flex justify-center mt-6 gap-4">
              <button
                onClick={() => fetchNextPage()}
                className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
              >
                Próximo
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListClient;
