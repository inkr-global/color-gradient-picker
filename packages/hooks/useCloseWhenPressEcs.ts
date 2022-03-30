import { useEffect } from "react";

const useCloseWhenPressEcs = (callback: () => void) => {
  useEffect(() => {
    if (typeof document === "undefined") return () => undefined;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        callback();
        (document.activeElement as HTMLInputElement)?.blur();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [callback]);
};

export default useCloseWhenPressEcs;
