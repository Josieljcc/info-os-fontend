import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import Card from "@/components/Card/Card";
import Spinner from "@/components/spinner/spinner";
import { SearchField } from "@/hook/useClient/types";
import useClient from "@/hook/useClient/useClient";
import { useClientSearch } from "@/hook/useClient/useSearchClient";
import { Client } from "@/types";
import { useState } from "react";
import { Link } from "react-router-dom";

const ListClient = () => {


  const [searchType, setSearchType] = useState<SearchField>("name");
  const [searchValue, setSearchValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const { clients, isLoading } = useClient();

  const searchParams = { [searchType]: searchValue.trim() };
  const isSearchEnabled = searchActive && !!searchValue.trim();

  const { data: searchResults, isLoading: isSearching } = useClientSearch({
    searchTerm: searchParams,
    enabled: isSearchEnabled,
  });

  const displayClients = searchActive ? searchResults : clients;

  const handleSearch = () => {
    if (!searchValue.trim()) {
      return;
    }
    setSearchActive(true);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSearchActive(false);
  };

  if (isLoading || isSearching) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-main-bg bg-cover overflow-hidden bg-center flex flex-col justify-start pt-24 px-8 pb-5 md:items-center">
      <h2 className="text-center pb-6 text-4xl font-bold text-white">
        Lista de Clientes
      </h2>

      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <div className="flex gap-2">
          <select
            value={searchType}
            onChange={(event) =>
              setSearchType(event.target.value as SearchField)
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
            onChange={(event) => setSearchValue(event.target.value)}
            className="px-4 py-2 rounded-md"
          />
        </div>
        <div className="flex gap-2">
          <ButtonPrimary
            onClick={handleSearch}
            className="text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Buscar
          </ButtonPrimary>
          {searchActive && (
            <ButtonPrimary
              onClick={handleClearSearch}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Limpar Busca
            </ButtonPrimary>
          )}
        </div>
      </div>

      {!displayClients?.length ? (
        <div className="text-white text-center">
          <p>Nenhum cliente encontrado</p>
          <div className="mt-4">
            {/* TODO - Criar função de Criar Cliente */}
            <ButtonPrimary>Criar Cliente</ButtonPrimary>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:justify-center gap-3 md:flex-row md:flex-wrap md:gap-5 overflow-auto max-h-[60vh]">
          {displayClients?.map((client) => (
            <Link key={client?.id} to={`/app/client/${client?.id}`}>
              <Card item={client as Client} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListClient;
