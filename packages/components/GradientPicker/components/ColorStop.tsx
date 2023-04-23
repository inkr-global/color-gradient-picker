/* eslint-disable @typescript-eslint/ban-ts-comment */

import clsx from "clsx";
import { useRef } from "react";

import { ColorStopProps } from "../../../types/gradientPicker";
import { useColorStopDrag } from "../hooks/useColorStopDrag";
import s from "../styles/ColorStop.module.css";

export const ColorStop = (props: ColorStopProps) => {
  const {
    stop,
    limits,
    onPosChange,
    onDeleteColor,
    onDragStart,
    onDragEnd,
  } = props;

  const colorStopRef = useRef<HTMLDivElement>(null);

  const [drag] = useColorStopDrag({
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
