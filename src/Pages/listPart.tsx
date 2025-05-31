import CardPart from "@/components/Cards/CardPart";
import DrawerPart from "@/components/drawerPart/drawerPart";
import SearchInput from "@/components/searchInput/searchInput";
import Spinner from "@/components/spinner/spinner";
import useDebounce from "@/hook/useDebounce/useDebounce";
import usePart from "@/hook/usePart";
import useResizeObserver from "@/hook/useResizeObserver";
import useRowVirtualizer from "@/hook/useRowVirtualizer";
import useSearchByName from "@/hook/useSearchByName";
import { Part } from "@/types";
import { useState } from "react";

const ListPart = () => {
  const [searchValue, setSearchValue] = useState("");
  const { ref, rect } = useResizeObserver();
  const { parts, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePart();

  const [debouncedSearch] = useDebounce(searchValue, 400);

  const { data: filteredPart } = useSearchByName<Part>({
    name: debouncedSearch,
    enabled: Boolean(debouncedSearch.trim()),
    url: "part",
  });

  const displayedParts = debouncedSearch.trim() ? filteredPart ?? [] : parts;

  const rowVirtualizer = useRowVirtualizer({
    estimateSize: 70,
    fetchNextPage,
    gap: 6,
    hasNextPage,
    isFetchingNextPage,
    list: displayedParts,
    ref,
  });

  if (isLoading) {
    return <Spinner />;
  }

  const getCardHeight = () => {
    return Number(rect?.width) >= 768 ? "69px" : "64px";
  };

  return (
    <div className="h-screen w-full bg-secondaryColor flex flex-col px-6 pt-8 relative gap-10 rounded-lg">
      <header className="flex flex-col gap-5 ">
        <div className="flex md:flex-row flex-col-reverse justify-between flex-wrap gap-4 md:gap-0">
          <DrawerPart />
          <div className="flex gap-5">
            <SearchInput setValue={setSearchValue} />
          </div>
        </div>
        <div className="md:flex hidden w-full flex-1 items-center text-base  text-[#B5B7C0] font-medium px-10">
          <p className="text-sm font-medium w-1/3">Nome</p>
          <p className="text-sm font-medium w-1/3">Preço</p>
          <p className="text-sm font-medium w-1/3">Quantidade</p>
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
            const part = displayedParts[virtualRow.index];

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
                <CardPart part={part as Part} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListPart;
