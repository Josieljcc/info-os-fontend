import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";
import useAuthentication from "./useAuthentication";
import useTechnician from "./useTechnician";

const useRowVirtualizer = (
  ref: React.MutableRefObject<any>,
  estimateSize: number,
  gap: number
) => {
  const { technicians, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useTechnician();

  useAuthentication();

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? technicians.length + 1 : technicians.length,
    getScrollElement: () => ref.current,
    estimateSize: () => estimateSize,
    overscan: 10,
    gap: gap,
  });

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

  return rowVirtualizer;
};

export default useRowVirtualizer;
