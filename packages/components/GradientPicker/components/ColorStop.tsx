/* eslint-disable @typescript-eslint/ban-ts-comment */

import clsx from "clsx";
import { useRef } from "react";

import { noop } from "../../../utils/common";
import useStopDragging from "../hooks/useStopDragging";
import { ColorStopProps } from "../misc/types";
import s from "../styles/ColorStop.module.css";

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
      className={clsx(s.color_stop, isActive && s.active)}
      ref={colorStopRef}
      role="presentation"
      style={{
        left: offset,
        backgroundColor: rgba,
        opacity: alpha,
      }}
      // @ts-expect-error
      onMouseDown={drag}
      // @ts-expect-error
      onTouchStart={drag}
      title={rgba}
    />
  );
};

export default ColorStop;
