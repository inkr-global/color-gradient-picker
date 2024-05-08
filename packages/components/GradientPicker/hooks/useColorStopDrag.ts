import { DragEventHandler, useCallback, useMemo, useState } from "react";

import { DEFAULT_STOP_REMOVAL_DROP } from "../../../constants/gradientPicker";
import { GradientLimits, GradientStop } from "../../../types/gradientPicker";
import { useHandleColorStopDraggingEvent } from "./useHandleColorStopDraggingEvent";


/**
 * Limits a client drag movement within given min / max
 */
function limitPos(offset: number, min: number, max: number) {
  return Math.max(Math.min(offset, max), min);
}


function getColorStopRefTop(ref: React.RefObject<HTMLDivElement>) {
  if (!ref.current) return 0;
  return ref.current.getBoundingClientRect().top;
}


export function useColorStopDrag({
  stop,
  limits,
  colorStopRef,
  onPosChange,
  onDeleteColor,
  onDragStart,
  onDragEnd,
}: {
  stop: GradientStop;
  limits: GradientLimits;
  colorStopRef: React.RefObject<HTMLDivElement>;
  onPosChange: (id: number, offset: number) => void;
  onDeleteColor: (id: number) => void;
  onDragStart: (id: number) => void;
  onDragEnd?: (id: number) => void;
}) {


  const [startClientX, setStartClientX] = useState(0);
  const [startOffset, setStartOffset] = useState(0);


  const handleDragStart: DragEventHandler = useCallback(({ clientX }) => {
    if (typeof stop.id === "undefined") return;
    setStartClientX(clientX);
    setStartOffset(stop.offset);
    onDragStart(stop.id);
  }, [onDragStart, stop.id, stop.offset]);


  const handleDrag: DragEventHandler = useCallback(({ clientX, clientY }) => {

    if (typeof stop.id === "undefined") return;

    const { min, max } = limits;

    // Removing if out of drop limit on Y axis.
    const top = getColorStopRefTop(colorStopRef);
    if (Math.abs(clientY - top) > (limits.drop || DEFAULT_STOP_REMOVAL_DROP)) {
      // deactivateEvent();
      onDeleteColor(stop.id);
      return;
    }

    // Limit movements
    const newOffset = startOffset + (clientX - startClientX);
    const limitedPos = limitPos(newOffset, min, max);

    onPosChange(stop.id, limitedPos);

  }, [colorStopRef, limits, onDeleteColor, onPosChange, startClientX, startOffset, stop.id]);


  const handleDragEnd = useCallback(() => {
    if (typeof stop.id === "undefined") return;
    onDragEnd?.(stop.id);
  }, [onDragEnd, stop.id]);


  const { dragHandler } = useHandleColorStopDraggingEvent({
    onDragStart: handleDragStart,
    onDrag: handleDrag,
    onDragEnd: handleDragEnd,
  });


  return useMemo(() => ({
    dragHandler: dragHandler,
  }), [dragHandler]);
}
