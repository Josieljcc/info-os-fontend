import CardOrderService from "@/components/Cards/CardOrder";
import DrawerOrderService from "@/components/drawerOrderService/drawerOrderService";
import SearchInput from "@/components/searchInput/searchInput";
import Spinner from "@/components/spinner/spinner";
import useDebounce from "@/hook/useDebounce/useDebounce";
import useOrder from "@/hook/useOrderService/useOrder";
import useResizeObserver from "@/hook/useResizeObserver";
import useRowVirtualizer from "@/hook/useRowVirtualizer";
import { useOrderSearch } from "@/hook/useOrderService/useSearchOrder";
import { OrderSearchField } from "@/hook/useOrderService/types";
import { OrderResponse } from "@/types";
import { useState } from "react";

const ListOrderService = () => {
  const { orders, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useOrder();
  const [searchType, setSearchType] = useState<OrderSearchField>("clientName");
  const [searchValue, setSearchValue] = useState("");
  const { ref, rect } = useResizeObserver();
  const [debouncedSearch] = useDebounce(searchValue, 400);

  const searchParams = { [searchType]: debouncedSearch };

  const { data: searchedOrders } = useOrderSearch({
    searchTerm: searchParams,
    enabled: Boolean(debouncedSearch.trim()),
  });

  const safeOrders: OrderResponse[] = (orders || []).filter(
    (o): o is OrderResponse => Boolean(o)
  );

  const displayedOrders = debouncedSearch.trim()
    ? searchedOrders ?? []
    : safeOrders;
  const rowVirtualizer = useRowVirtualizer({
    estimateSize: 70,
    fetchNextPage,
    gap: 6,
    hasNextPage,
    isFetchingNextPage,
    list: displayedOrders,
    ref,
  });
  const getCardHeight = () => {
    return Number(rect?.width) >= 768 ? "69px" : "64px";
  };
  if (isLoading) return <Spinner />;
  return (
    <div className="h-screen w-full bg-secondaryColor flex flex-col px-6 pt-8 relative gap-10 rounded-lg">
      <header className="flex flex-col gap-5">
        <div className="flex md:flex-row flex-col-reverse justify-between flex-wrap gap-4 md:gap-0">
          <DrawerOrderService />
          <div className="flex gap-5">
            <select
              value={searchType}
              onChange={(event) =>
                setSearchType(event.target.value as OrderSearchField)
              }
              className="bg-secondaryColor text-white focus:outline-none pl-2 md:pr-6 border-2 border-[#e9ecef7b] rounded-2xl hover:bg-[#505050] transition-all"
            >
              <option value="clientName" className="bg-[#2a2a2a] text-sm">
                Cliente
              </option>
              <option value="openingDate" className="bg-[#2a2a2a] text-sm">
                Data Abertura
              </option>
              <option value="forecastDate" className="bg-[#2a2a2a] text-sm">
                Data Entrega
              </option>
              <option value="status" className="bg-[#2a2a2a] text-sm">
                Situação
              </option>
            </select>
            <SearchInput setValue={setSearchValue} />
          </div>
        </div>
        <div className="md:flex hidden w-[95%] flex-1 items-center text-base  text-[#B5B7C0] font-medium px-7">
          <p className="text-sm font-medium w-1/5">ID</p>
          <p className="text-sm font-medium w-1/5">Cliente</p>
          <p className="text-sm font-medium w-1/5">Abertura</p>
          <p className="text-sm font-medium w-1/5">Entrega</p>
          <p className="text-sm font-medium w-1/5">Situação</p>
        </div>
        <div className="w-full left-0 md:block hidden top-32 p-[.0313rem] bg-[#464646] absolute" />
      </header>
      <div
        ref={ref}
        className="overflow-auto scrollbar-thin scrollbar-thumb-[#9f9f9f] scrollbar-track-[#2c2c2c] pr-3"
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const order = displayedOrders[virtualRow.index];
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
                <CardOrderService order={order as OrderResponse} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default ListOrderService;
