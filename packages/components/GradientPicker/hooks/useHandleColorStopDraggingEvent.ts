// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {
  DragEventHandler,
  TouchEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";


const Events = {
  MOUSEDOWN: "mousedown",
  MOUSEMOVE: "mousemove",
  MOUSEUP: "mouseup",
  TOUCHSTART: "touchstart",
  TOUCHMOVE: "touchmove",
  TOUCHEND: "touchend",
};


const DRAG_HANDLERS = {

  MOUSE: {
    stop: (e: MouseEvent) => {
      e.stopPropagation();
    },
    coordinates: ({ clientX, clientY }: MouseEvent) => ({
      clientX: clientX,
      clientY: clientY,
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


interface UseColorStopDraggingParams {
  onDragStart: DragEventHandler;
  onDrag: DragEventHandler;
  onDragEnd: DragEventHandler;
}


export function useHandleColorStopDraggingEvent({
  onDragStart,
  onDrag,
  onDragEnd,
}: UseColorStopDraggingParams) {


  const [dragging, setDragging] = useState(false);

  const dragContext = useRef<{ handler: typeof DRAG_HANDLERS }>({});


  // ------------------------------------------------------------------------------------------

  const activateEvent = useCallback((
    e: MouseEvent,
    handler: typeof DRAG_HANDLERS.MOUSE | typeof DRAG_HANDLERS.TOUCH,
  ) => {
    setDragging(true);
    dragContext.current.handler = handler;
    onDragStart(handler.coordinates(e));
  }, [onDragStart]);


  const deactivateEvent = useCallback(() => {
    setDragging(false);
    onDragEnd(dragContext.current.change);
    dragContext.current = {};
  }, [onDragEnd]);


  const dragHandler: DragEventHandler | TouchEventHandler = useCallback((e: Dra) => {
    const handler = isTouch(e) ? DRAG_HANDLERS.TOUCH : DRAG_HANDLERS.MOUSE;
    handler.stop(e);
    activateEvent(e, handler);
  }, [activateEvent]);


  const handleDrag = useCallback((e: MouseEvent) => {
    const { handler } = dragContext.current;
    if (!dragging) return;
    dragContext.current.change = onDrag(handler.coordinates(e));
  }, [dragging, onDrag]);


  useEffect(() => {

    const { handler } = dragContext.current;
    if (!handler) return () => undefined;

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

  }, [deactivateEvent, dragging, handleDrag]);


  return useMemo(() => ({
    dragHandler: dragHandler,
  }), [dragHandler]);
}
