/* eslint-disable @typescript-eslint/ban-ts-comment */

import clsx from "clsx";
import { CSSProperties, memo, useCallback, useMemo, useRef, useState } from "react";

import { ColorStopProps } from "../../../types/gradientPicker";
import { useColorStopDrag } from "../hooks/useColorStopDrag";
import s from "../styles/ColorStop.module.css";


export const ColorStop = memo(function ColorStop({
  stop,
  limits,
  onPosChange,
  onDeleteColor,
  onDragStart,
  onDragEnd,
}: ColorStopProps) {


  const colorStopRef = useRef<HTMLDivElement>(null);


  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = useCallback(() => {
    if (typeof stop.id === "undefined") return;
    onDragStart(stop.id);
    setIsDragging(true);
  }, [onDragStart, stop.id]);

  const handleDragEnd = useCallback(() => {
    if (typeof stop.id === "undefined") return;
    onDragEnd?.(stop.id);
    setIsDragging(false);
  }, [onDragEnd, stop.id]);


  const { dragHandler } = useColorStopDrag({
    stop: stop,
    limits: limits,
    onPosChange: onPosChange,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDeleteColor: onDeleteColor,
    colorStopRef: colorStopRef,
  });


  const {
    offset,
    red,
    green,
    blue,
    alpha,
    isActive,
  } = stop;

  const rgba = `rgba(${red}, ${green}, ${blue}, ${alpha})`;


  return (
    <div
      className={clsx(
        s.color_stop,
        isActive && s.active,
        isDragging && s.dragging,
      )}
      ref={colorStopRef}
      role="presentation"
      style={useMemo((): CSSProperties => ({
        left: offset,
        backgroundColor: rgba,
        opacity: alpha,
      }), [alpha, offset, rgba])}
      // @ts-expect-error
      onMouseDown={dragHandler}
      // @ts-expect-error
      onTouchStart={dragHandler}
      title={rgba}
    />
  );

});
