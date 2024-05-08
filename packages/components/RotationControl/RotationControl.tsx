/* eslint-disable react/no-unused-prop-types */
import cn from "clsx";
import { ForwardedRef, forwardRef, HTMLAttributes, memo, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react";

import s from "./RotationControl.module.css";


export interface RotationControlProps extends HTMLAttributes<HTMLDivElement> {

  // Value
  defaultValue?: number;
  value?: number;
  onValueChange?: (value: number) => void;

  // Adjusting
  onAdjustingStart?: () => void;
  onAdjustingEnd?: () => void;

}


export const RotationControl = memo(forwardRef(function RotationControl({

  // Value
  defaultValue = 0.0,
  value,
  onValueChange,

  // Adjusting
  onAdjustingStart,
  onAdjustingEnd,

  // Overriden HTML props
  className,
  onMouseDown,

  // Other HTML props
  ...htmlProps

}: RotationControlProps, forwardedRef: ForwardedRef<HTMLDivElement>) {


  const ref = useRef<HTMLDivElement>(null);

  useImperativeHandle(forwardedRef, useCallback(() => (
    ref.current as HTMLDivElement
  ), []));


  const [stateValue, setStateValue] = useState<number>();

  const finalValue = value ?? stateValue ?? defaultValue;


  const handleMouseDown = useCallback((mouseDownEvent: React.MouseEvent<HTMLDivElement>) => {

    const clientBoundingRect = ref.current?.getBoundingClientRect();
    if (clientBoundingRect) {

      const center = {
        x: clientBoundingRect.left + clientBoundingRect.width / 2.0,
        y: clientBoundingRect.top + clientBoundingRect.height / 2.0,
      };

      const updateValue = (mouseMoveEvent: Pick<typeof mouseDownEvent, "clientX" | "clientY" | "shiftKey">) => {

        const {
          clientX,
          clientY,
          shiftKey,
        } = mouseMoveEvent;

        const deltaX = clientX - center.x;
        const deltaY = clientY - center.y;

        let degree = (Math.atan2(deltaY, deltaX) * 180.0) / Math.PI;

        degree = normalizeDegree(degree);

        if (shiftKey) {
          degree = snapDegree(degree);
        }

        degree = Math.round(degree);

        if (typeof value !== "undefined") {
          onValueChange?.(degree);
        } else {
          setStateValue(degree);
        }
      };

      updateValue(mouseDownEvent);

      const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
        updateValue(mouseMoveEvent);
      };

      const handleMouseUp = () => {

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);

        onAdjustingEnd?.();
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      onAdjustingStart?.();
    }

    onMouseDown?.(mouseDownEvent);

  }, [onAdjustingEnd, onAdjustingStart, onMouseDown, onValueChange, value]);


  return (
    <div
      ref={ref}
      role="presentation"
      className={cn(
        s.container,
        className,
      )}
      onMouseDown={handleMouseDown}
      {...htmlProps}
    >

      <div
        className={s.circle}
        style={useMemo(() => ({
          transform: `rotate(${finalValue}deg)`,
        }), [finalValue])}
      >
        <div className={s.needle} />
        <div className={s.center} />
      </div>

    </div>
  );

}));


const DEGREE_SNAP_RANGE = 15.0;

function snapDegree(degree: number) {
  const snappedDegree = Math.round(degree / DEGREE_SNAP_RANGE) * DEGREE_SNAP_RANGE;
  return normalizeDegree(snappedDegree);
}


export function normalizeDegree(degree: number) {

  let newDegree = fixFloating(degree);

  while ((newDegree < 0.0) || (newDegree >= 360.0)) {
    if (newDegree < 0.0) newDegree += 360.0;
    if (newDegree >= 360.0) newDegree -= 360.0;
    newDegree = fixFloating(newDegree);
  }

  return newDegree;
}


function fixFloating(value: number) {
  return roundNumber(value, 12);
}


function roundNumber(value: number, precision = 0) {
  return Math.round(Number(value * (10 ** precision))) / (10 ** precision);
}
