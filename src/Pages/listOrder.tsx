import BackPageButton from "@/components/backPageButton/backPageButton";
import ButtonPrimary from "@/components/buttonPrimary/buttonPrimary";
import CardOrder from "@/components/Cards/CardOrder";

import Spinner from "@/components/spinner/spinner";
import useOrder from "@/hook/useOrder";
import useResizeObserver from "@/hook/useResizeObserver";
import useRowVirtualizer from "@/hook/useRowVirtualizer";
import { OrderResponse } from "@/types";

const ListOrder = () => {
  const { ref, rect } = useResizeObserver();
  const { orders, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useOrder();

  const rowVirtualizer = useRowVirtualizer({
    estimateSize: 250,
    fetchNextPage,
    gap: 6,
    hasNextPage,
    isFetchingNextPage,
    list: orders,
    ref,
  });

  if (isLoading) {
    return <Spinner />;
  }

  const getCardHeight = () => {
    return Number(rect?.width) >= 768 ? "300px" : "200px";
  };

  return (
    <div className="h-screen bg-gray-950 flex flex-col p-16 md:p-0 justify-center pt-6 md:pt-10 pb-1 relative">
      <BackPageButton route="/home" />
      <h2 className="text-center pb-6 md:pb-12 text-2xl font-bold md:text-4xl text-white">
        Lista de ordem de serviço
      </h2>
      {orders?.length === 0 ? (
        <div>
          <p>Nenhum ordem de serviço encontrado</p>
          <ButtonPrimary>Criar ordem de serviço</ButtonPrimary>
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
              const order = orders[virtualRow.index];

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
                  <CardOrder order={order as OrderResponse} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListOrder;
