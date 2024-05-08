import { memo, useEffect } from "react";


export const ClosePanelWhenClickOutside = memo(function ClosePanelWhenClickOutside({
  containerRef,
  callback,
}: {
  containerRef: React.RefObject<HTMLDivElement>,
  callback: () => void,
}) {

  useEffect(() => {

    if (typeof document === "undefined") return () => undefined;

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

  }, [callback, containerRef]);


  return null;
});
