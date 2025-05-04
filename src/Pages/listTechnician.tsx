import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import Spinner from "@/components/spinner/spinner";
import Card from "@/components/Card/Card";
import useAuthentication from "@/hook/useAuthentication";
import useTechnician from "@/hook/useTechnician";
import { Technician } from "@/types";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";
import useResizeObserver from "@/hook/useResizeObserver";
import BackPageButton from "@/components/backPageButton/backPageButton";



const ListTechnician = () => {
  const {
    technicians,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useTechnician();
  useAuthentication();

  const { ref, rect } = useResizeObserver();

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? technicians.length + 1 : technicians.length,
    getScrollElement: () => ref.current,
    estimateSize: () => 250,
    overscan: 10,
    gap: 6,
  });

  const getCardHeight = () => {
    return Number(rect?.width) >= 768 ? "300px" : "200px";
  };

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= technicians.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    technicians.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="h-screen bg-gray-950 flex flex-col p-16 md:p-0 justify-center pt-6 md:pt-10 pb-1 relative">
      <BackPageButton route="/home" />
      <h2 className="text-center pb-6 md:pb-12 text-2xl font-bold md:text-4xl text-white">
        Lista de Técnicos
      </h2>
      {technicians?.length === 0 ? (
        <div>
          <p>Nenhum técnico encontrado</p>
          <ButtonPrimary>Criar Técnico</ButtonPrimary>
        </div>
      ) : (
        <div ref={ref} className="overflow-auto">
          <div
            className=""
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const technician = technicians[virtualRow.index];

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
                    key={technician?.id}
                    item={technician as Technician}
                    classname="m-auto"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListTechnician;
