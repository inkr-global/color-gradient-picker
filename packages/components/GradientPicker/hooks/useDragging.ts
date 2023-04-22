// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck


import {
  DragEventHandler,
  TouchEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

import { Events } from "../misc/constants";


const DRAG_HANDLERS = {
  MOUSE: {
    stop: (e: MouseEvent) => {
      e.stopPropagation();
    },
    coordinates: ({ clientX, clientY }: MouseEvent) => ({
      clientX,
      clientY,
    }),
    dragEvent: { name: Events.MOUSEMOVE },
    dragEndEvent: { name: Events.MOUSEUP },
  },
  TOUCH: {
    stop: () => undefined,
    coordinates: (e: TouchEvent) => {
      const [touch] = e.touches;
      return {
        clientX: touch.clientX,
        clientY: touch.clientY,
      };
    },
    dragEvent: {
      name: Events.TOUCHMOVE,
      options: {
        cancelable: true,
        passive: true,
      },
    },
    dragEndEvent: { name: Events.TOUCHEND },
  },
};

const isTouch = (e: Event) => e.type === Events.TOUCHSTART;

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
