import { useEffect, useRef, useState } from "react";

type ObserverRect = Omit<DOMRectReadOnly, "toJSON">;

const useResizeObserver = () => {
  const ref = useRef<any>(null);
  const [rect, setRect] = useState<ObserverRect>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new ResizeObserver(() => {
      const boundingRect = ref.current.getBoundingClientRect();
      setRect(boundingRect);
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return { ref, rect };
};
export default useResizeObserver;
