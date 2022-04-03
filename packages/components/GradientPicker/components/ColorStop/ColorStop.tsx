import clsx from "clsx";
import { useEffect, useRef } from "react";

import { ColorStopProps } from "../../types";
import { noop } from "../../utils";
import s from "./ColorStop.module.css";
import useStopDragging from "./hooks/useStopDragging";

const ColorStop = (props: ColorStopProps) => {
  const {
    stop,
    limits,
    onPosChange,
    onDeleteColor,
    onDragStart = noop,
    onDragEnd = noop,
  } = props;

  const colorStopRef = useRef<HTMLDivElement>(null);

  const [drag] = useStopDragging({
    stop,
    limits,
    onPosChange,
    onDragStart,
    onDragEnd,
    onDeleteColor,
    colorStopRef,
  });

  const { offset, color, isActive, alpha, id } = stop;

  useEffect(() => {
    if (typeof document === "undefined") return () => undefined;

    const handler = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && isActive) {
        onDeleteColor(id);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };

  // do not check onDelete
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, id]);

  const rgba = `rgba(${color.red}, ${color.green}, ${color.blue}, ${alpha})`;

  return (
    <div
      className={clsx(s.cs, isActive && s.active)}
      ref={colorStopRef}
      style={{
        left: offset,
        backgroundColor: rgba,
        opacity: alpha,
      }}
      onMouseDown={drag}
      onTouchStart={drag}
      title={rgba}
      tabIndex={0}
    />
  );
};

export default ColorStop;
