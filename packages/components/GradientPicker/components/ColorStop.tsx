import clsx from "clsx";
import { useRef } from "react";

import { noop } from "../../../utils/common";
import useStopDragging from "../hooks/useStopDragging";
import s from "../styles/ColorStop.module.css";
import { ColorStopProps } from "../types";


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
    stop: stop,
    limits: limits,
    onPosChange: onPosChange,
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
    onDeleteColor: onDeleteColor,
    colorStopRef: colorStopRef,
  });

  const { offset, red, green, blue, isActive, alpha } = stop;

  const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

  return (
    <div
      className={clsx(s.cs, isActive && s.active)}
      ref={colorStopRef}
      style={{
        left: offset,
        backgroundColor: rgba,
        opacity: alpha,
      }}
      // TODO check tsc
      // @ts-ignore
      onMouseDown={drag}
      // @ts-ignore
      onTouchStart={drag}
      title={rgba}
    />
  );
};

export default ColorStop;
