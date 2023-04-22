import { useEffect } from "react";

export const useClosePanelWhenClickOutside = (
  containerRef: React.RefObject<HTMLDivElement>,
  callback: () => void,
  isDragging: boolean,
) => {
  useEffect(() => {
    if (typeof document === "undefined") return () => undefined;
    if (isDragging) return () => undefined;

    const handler = (e: Event) => {
      if (!containerRef.current?.contains(e.target as HTMLElement)) {
        callback();
      }
    };

    document.addEventListener("click", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [callback, containerRef, isDragging]);
};

