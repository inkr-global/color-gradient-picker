import { DragEventHandler, TouchEventHandler, useEffect, useRef, useState } from "react";

import { noop } from "../../../utils";
import { EVENTS } from "./constants";

const DRAG_HANDLERS = {
  MOUSE: {
    stop: (e: MouseEvent) => {
      e.stopPropagation();
    },
    coordinates: ({ clientX, clientY }: MouseEvent) => ({
      clientX,
      clientY,
    }),
    dragEvent: { name: EVENTS.MOUSEMOVE },
    dragEndEvent: { name: EVENTS.MOUSEUP },
  },
  TOUCH: {
    stop: noop,
    coordinates: (e: TouchEvent) => {
      const [touch] = e.touches;
      return {
        clientX: touch.clientX,
        clientY: touch.clientY,
      };
    },
    dragEvent: {
      name: EVENTS.TOUCHMOVE,
      options: {
        cancelable: true,
        passive: true,
      },
    },
    dragEndEvent: { name: EVENTS.TOUCHEND },
  },
};

const isTouch = (e: Event) => e.type === EVENTS.TOUCHSTART;

interface UseDraggingParams {
  onDragStart: DragEventHandler;
  onDrag: DragEventHandler;
  onDragEnd: DragEventHandler;
}

const useDragging = ({ onDragStart, onDrag, onDragEnd }: UseDraggingParams) => {
  const [dragging, setDragging] = useState(false);

  const dragContext = useRef<{ handler: typeof DRAG_HANDLERS }>({});

  // ------------------------------------------------------------------------------------------

  const activateEvent = (
    e: MouseEvent,
    handler: typeof DRAG_HANDLERS.MOUSE | typeof DRAG_HANDLERS.TOUCH,
  ) => {
    setDragging(true);
    dragContext.current.handler = handler;

    onDragStart(handler.coordinates(e));
  };

  const deactivateEvent = () => {
    setDragging(false);

    onDragEnd(dragContext.current.change);
    dragContext.current = {};
  };

  const dragHandler: DragEventHandler | TouchEventHandler = (e: Dra) => {
    const handler = isTouch(e) ? DRAG_HANDLERS.TOUCH : DRAG_HANDLERS.MOUSE;

    handler.stop(e);

    activateEvent(e, handler);
  };

  const handleDrag = (e: MouseEvent) => {
    const { handler } = dragContext.current;
    if (!dragging) return;

    dragContext.current.change = onDrag(handler.coordinates(e));
  };

  useEffect(() => {
    const { handler } = dragContext.current;
    if (!handler) return;

    const { dragEvent, dragEndEvent } = handler;

    if (dragging) {
      document.addEventListener(
        dragEvent.name,
        handleDrag,
        dragEndEvent.options,
      );
      document.addEventListener(dragEndEvent.name, deactivateEvent);
    }

    return () => {
      document.removeEventListener(
        dragEvent.name,
        handleDrag,
        dragEndEvent.options,
      );
      document.removeEventListener(dragEndEvent.name, deactivateEvent);
    };
  }, [dragging]);

  return [dragHandler, activateEvent, deactivateEvent];
};

export default useDragging;
