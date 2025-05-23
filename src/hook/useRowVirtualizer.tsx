import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";

import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

type useRowVirtualizerProps = {
  ref: React.MutableRefObject<any>;
  estimateSize: number;
  gap: number;
  hasNextPage: boolean;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<any | undefined, unknown>, Error>
  >;
  isFetchingNextPage: boolean;
  list: any[];
};

const useRowVirtualizer = ({
  estimateSize,
  fetchNextPage,
  gap,
  hasNextPage,
  isFetchingNextPage,
  list,
  ref,
}: useRowVirtualizerProps) => {



  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? list.length + 1 : list.length,
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
      lastItem.index >= list.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    list.length,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems(),
  ]);

  return rowVirtualizer;
};

export default useRowVirtualizer;
