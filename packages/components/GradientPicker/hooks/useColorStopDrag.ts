import { DragEventHandler, useState } from "react";

import { DEFAULT_STOP_REMOVAL_DROP } from "../../../constants/gradientPicker";
import { GradientLimits, GradientStop } from "../../../types/gradientPicker";
import { useHandleColorStopDraggingEvent } from "./useHandleColorStopDraggingEvent";

/**
 * Limits a client drag movement within given min / max
 */
const limitPos = (offset: number, min: number, max: number) =>
  Math.max(Math.min(offset, max), min);

const getColorStopRefTop = (ref: React.RefObject<HTMLDivElement>) => {
  if (!ref.current) return 0;
  return ref.current.getBoundingClientRect().top;
};

interface Params {
  stop: GradientStop;
  limits: GradientLimits;
  colorStopRef: React.RefObject<HTMLDivElement>;
  onPosChange: (id: number, offset: number) => void;
  onDeleteColor: (id: number) => void;
  onDragStart: (id: number) => void;
  onDragEnd?: (id: number) => void;
}

export const useColorStopDrag = ({
  limits,
  stop,
  colorStopRef,
  onPosChange,
  onDragStart,
  onDragEnd,
  onDeleteColor,
}: Params) => {
  const [posStart, setPosStart] = useState(0);

  const handleDragStart: DragEventHandler = ({ clientX }) => {
    if (typeof stop.id === "undefined") return;
    setPosStart(clientX);
    onDragStart(stop.id);
  };

  const handleDrag: DragEventHandler = ({ clientX, clientY }) => {
    const { id, offset } = stop;
    const { min, max } = limits;

    if (typeof id === "undefined") return;

    // Removing if out of drop limit on Y axis.
    const top = getColorStopRefTop(colorStopRef);
    if (Math.abs(clientY - top) > (limits.drop || DEFAULT_STOP_REMOVAL_DROP)) {
      // deactivateEvent();
      onDeleteColor(id);
      return;
    }

    // Limit movements
    const dragOffset = offset - posStart;
    const limitedPos = limitPos(dragOffset + clientX, min, max);

    onPosChange(id, limitedPos);
  };

  const handleDragEnd = () => {
    if (typeof stop.id === "undefined") return;
    onDragEnd?.(stop.id);
  };

  const [drag] = useHandleColorStopDraggingEvent({
    onDragStart: handleDragStart,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
  });

  return [drag];
};
