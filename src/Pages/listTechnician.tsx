import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import Card from "@/components/Cards/CardUser";
import useAuthentication from "@/hook/useAuthentication";
import useTechnician from "@/hook/useTechnician";
import { Technician } from "@/types";
import useResizeObserver from "@/hook/useResizeObserver";
import BackPageButton from "@/components/backPageButton/backPageButton";
import useRowVirtualizer from "@/hook/useRowVirtualizer";
import Spinner from "@/components/spinner/spinner";

const ListTechnician = () => {
  useAuthentication();
  const { ref, rect } = useResizeObserver();
  const {
    technicians,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTechnician();

  const rowVirtualizer = useRowVirtualizer({
    estimateSize: 250,
    fetchNextPage,
    gap: 6,
    hasNextPage,
    isFetchingNextPage,
    list: technicians,
    ref,
  });

  const getCardHeight = () => {
    return Number(rect?.width) >= 768 ? "300px" : "200px";
  };

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
