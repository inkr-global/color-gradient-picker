import "./index.css";

import React, { useRef } from "react";

import { ColorStopProps } from "../../types";
import { noop } from "../../utils";
import useStopDragging from "./hooks/useStopDragging";

const ColorStop = (props: ColorStopProps) => {
  const {
    stop,
    limits,
    onPosChange,
    onDeleteColor,
    onDragStart = noop,
    // onDragEnd = noop,
  } = props;

  const colorStopRef = useRef<HTMLDivElement>(null);

  const [drag] = useStopDragging({
    stop,
    limits,
    onPosChange,
    onDragStart,
    // onDragEnd,
    onDeleteColor,
    colorStopRef,
  });

  const { offset, color, isActive, alpha } = stop;

  return (
    <div
      className={isActive ? "cs active" : "cs"}
      ref={colorStopRef}
      style={{ left: offset }}
      onMouseDown={drag}
      onTouchStart={drag}
    >
      <div
        style={{
          backgroundColor: color,
          opacity: alpha,
        }}
      />
    </div>
  );
};

export default ColorStop;
