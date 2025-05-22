import Card from "@/components/Cards/CardUser";
import DrawerClient from "@/components/drawerClient/drawerClient";
import Spinner from "@/components/spinner/spinner";
import { SearchField } from "@/hook/useClient/types";
import useClient from "@/hook/useClient/useClient";
import { useClientSearch } from "@/hook/useClient/useSearchClient";
import useDebounce from "@/hook/useDebounce/useDebounce";
import useResizeObserver from "@/hook/useResizeObserver";
import useRowVirtualizer from "@/hook/useRowVirtualizer";
import { Client } from "@/types";
import { useState } from "react";
import SearchInput from "@/components/searchInput/searchInput";

const ListClient = () => {
  const [searchType, setSearchType] = useState<SearchField>("name");
  const [searchValue, setSearchValue] = useState("");
  const { clients, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useClient();
  const [debouncedSearch] = useDebounce(searchValue, 400);

  const searchParams = { [searchType]: debouncedSearch };

  const { data: SearchClients } = useClientSearch({
    searchTerm: searchParams,
    enabled: !!debouncedSearch.trim(),
  });

  const displayedClients = debouncedSearch.trim()
    ? SearchClients ?? []
    : clients;

  const { ref, rect } = useResizeObserver();

  const rowVirtualizer = useRowVirtualizer({
    estimateSize: 70,
    fetchNextPage,
    gap: 6,
    hasNextPage,
    isFetchingNextPage,
    list: displayedClients,
    ref,
  });

  const getCardHeight = () => {
    return Number(rect?.width) >= 768 ? "68px" : "64px";
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="h-screen bg-[#323232] flex flex-col px-6 pt-8 relative gap-10 rounded-lg">
      <header className="flex flex-col gap-5">
        <div className="flex justify-between">
          <DrawerClient />
          <div className="flex gap-5">
            <select
              value={searchType}
              onChange={(event) =>
                setSearchType(event.target.value as SearchField)
              }
              className="bg-[#323232] text-white focus:outline-none pl-2 pr-6 border-2 border-[#e9ecef7b] rounded-2xl hover:bg-[#505050] transition-all"
            >
              <option value="name" className="bg-[#2a2a2a] text-sm ">
                Nome
              </option>
              <option value="email" className="bg-[#2a2a2a] text-sm">
                Email
              </option>
              <option value="phone" className="bg-[#2a2a2a] text-sm ">
                Telefone
              </option>
            </select>
            <SearchInput setValue={setSearchValue} />
          </div>
        </div>
        <div className="flex w-full flex-1 items-center text-base text-[#B5B7C0] font-medium px-10 pr-24">
          <p className="text-sm font-medium w-1/3">Nome</p>
          <p className="text-sm font-medium w-1/3 pl-8">Email</p>
          <p className="text-sm font-medium w-1/3">Telefone</p>
        </div>
        <div className="w-screen left-0 top-32 border-[1.4px] border-[#464646] absolute" />
      </header>
      <div
        ref={ref}
        className="overflow-auto scrollbar-thin scrollbar-thumb-[#9f9f9f] scrollbar-track-[#2c2c2c] pr-3"
      >
        <div
          className=""
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const client = displayedClients[virtualRow.index];

            return (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: getCardHeight(),
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <Card
                  key={client?.id}
                  item={client as Client}
                  classname="m-auto"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListClient;
