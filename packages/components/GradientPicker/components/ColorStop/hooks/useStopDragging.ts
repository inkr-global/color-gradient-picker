import { DragEventHandler, useState } from "react";

import { DEFAULT_STOP_REMOVAL_DROP } from "../../../constants";
import { GradientLimits, GradientStop } from "../../../types";
import useDragging from "./useDragging";

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
  onDragEnd: (id: number) => void;
}

const useStopDragging = ({
  limits,
  stop,
  colorStopRef,
  onPosChange,
  onDragStart,
  onDragEnd,
  onDeleteColor,
}: Params) => {
  const [posStart, setPosStart] = useState(0);

  const handleDrag: DragEventHandler = ({ clientX, clientY }) => {
    const { id, offset } = stop;
    const { min, max } = limits;

    // Removing if out of drop limit on Y axis.
    const top = getColorStopRefTop(colorStopRef);
    if (Math.abs(clientY - top) > (limits.drop || DEFAULT_STOP_REMOVAL_DROP)) {
      // deactivateEvent();
      return onDeleteColor(id!);
    }

    // Limit movements
    const dragOffset = offset - posStart;
    const limitedPos = limitPos(dragOffset + clientX, min, max);

    onPosChange(id!, limitedPos);
  };

  const [drag] = useDragging({
    onDragStart: ({ clientX }) => {
      setPosStart(clientX);

      onDragStart(stop.id!);
    },
    onDrag: handleDrag,
    onDragEnd: () => onDragEnd(stop.id!),
  });

  return [drag];
};

export default useStopDragging;
