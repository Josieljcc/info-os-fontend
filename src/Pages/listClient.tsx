import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import Card from "@/components/Card/Card";
import Spinner from "@/components/spinner/spinner";
import useAuthentication from "@/hook/useAuthentication";
import { SearchField } from "@/hook/useClient/types";
import useClient, { useClientSearch } from "@/hook/useClient/useClient";
import { Client } from "@/types";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const ListClient = () => {
  useAuthentication();

  const [searchType, setSearchType] = useState<SearchField>("name");
  const [searchValue, setSearchValue] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const { clients, isLoading, fetchNextPage, hasNextPage } = useClient();

  const searchParams = { [searchType]: searchValue.trim() };
  const isSearchEnabled = searchActive && !!searchValue.trim();

  const { data: searchResults, isLoading: isSearching } = useClientSearch(
    searchParams,
    isSearchEnabled
  );

  const displayClients = searchActive ? searchResults : clients;

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (searchActive || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [searchActive, hasNextPage, fetchNextPage]);

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    setSearchActive(true);
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setSearchActive(false);
  };

  if (isLoading || isSearching) return <Spinner />;

  return (
    <div className="min-h-screen bg-main-bg bg-cover overflow-hidden bg-center flex flex-col justify-start pt-24 px-8 pb-5 md:items-center">
      <h2 className="text-center pb-6 text-4xl font-bold text-white">
        Lista de Clientes
      </h2>

      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <div className="flex gap-2">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as SearchField)}
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

      {displayClients?.length === 0 ? (
        <div className="text-white text-center">
          <p>Nenhum cliente encontrado</p>
          <div className="mt-4">
            <ButtonPrimary>Criar Cliente</ButtonPrimary>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:justify-center gap-3 md:flex-row md:flex-wrap md:gap-5 overflow-auto max-h-[60vh]">
            {displayClients
              ?.filter((client): client is Client => client !== undefined)
              .map((client) => (
                <Link key={client?.id} to={`/client/${client?.id}`}>
                  <Card item={client as Client} />
                </Link>
              ))}
          </div>

          {!searchActive && hasNextPage && (
            <div ref={observerRef} className="mt-4 h-8 w-full" />
          )}
        </>
      )}
    </div>
  );
};

export default ListClient;
