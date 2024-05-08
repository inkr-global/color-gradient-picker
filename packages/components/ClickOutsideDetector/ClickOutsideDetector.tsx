import { memo, RefObject, useEffect } from "react";


export const ClickOutsideDetector = memo(function ClickOutsideDetector({
  containerRef,
  panelRef,
  onClickOutside,
}: {
  containerRef: RefObject<HTMLDivElement>,
  panelRef: RefObject<HTMLDivElement>,
  onClickOutside: () => void,
}) {

  useEffect(() => {

    if (typeof document === "undefined") return () => undefined;

    const handler = (event: MouseEvent | TouchEvent) => {

      const panel = panelRef.current;
      if (!panel) return;

      if (panel.contains(event.target as HTMLElement)) return;

      const panelBoundingClientRect = panel.getBoundingClientRect();
      if (!panelBoundingClientRect) return;

      let clientX = 0.0;
      let clientY = 0.0;
      if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else if (event instanceof TouchEvent) {
        const touch = event.touches[0];
        clientX = touch.clientX;
        clientY = touch.clientY;
      }

      const tolerance = 50.0;
      if (
        clientX >= panelBoundingClientRect.left - tolerance &&
        clientX <= panelBoundingClientRect.right + tolerance &&
        clientY >= panelBoundingClientRect.top - tolerance &&
        clientY <= panelBoundingClientRect.bottom + tolerance
      ) return;

      if (containerRef.current?.contains(event.target as HTMLElement)) return;

      onClickOutside();
    };

    document.addEventListener("click", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("touchstart", handler);
    };

  }, [containerRef, onClickOutside, panelRef]);


  return null;
});
