import clsx from "clsx";
import { useRef } from "react";

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

  const { offset, color, isActive, alpha } = stop;

  return (
    <div
      className={clsx(s.cs, isActive && s.active)}
      ref={colorStopRef}
      style={{
        left: offset,
        backgroundColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
        opacity: alpha,
      }}
      onMouseDown={drag}
      onTouchStart={drag}
    />
  );
};

export default ColorStop;
