import { useEffect, useState } from "react";

const replacePx = (value: string) => +value.replace("px", "");

interface DraggablePosition {
  left?: string;
  top?: string;
}

interface BOUND {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

const DEFAULT_BOUND: BOUND = {
  top: 0,
  left: 0,
  right: typeof window !== "undefined" ? window.innerWidth : 1000,
  bottom: typeof window !== "undefined" ? window.innerHeight : 1000,
};

function dragElement(params: {
  containerEle: HTMLElement;
  draggableElement?: HTMLElement | null;
  setPosition: (value: DraggablePosition) => void;
  setDragging: (isDragging: boolean) => void;
  onDragEnd?: (containerEle: HTMLElement) => void;
  bound?: BOUND;
}) {
  const {
    containerEle,
    draggableElement,
    setPosition,
    setDragging,
    onDragEnd,
    bound = DEFAULT_BOUND,
  } = params;

  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  function elementDrag(e: MouseEvent) {
    const _e = e || window.event;
    _e.preventDefault();

    // calculate the new cursor position:
    pos1 = pos3 - _e.clientX;
    pos2 = pos4 - _e.clientY;
    pos3 = _e.clientX;
    pos4 = _e.clientY;

    let newTop = containerEle.offsetTop - pos2;
    if (newTop < bound.top) newTop = bound.top;
    if (newTop + containerEle.offsetHeight > bound.bottom)
      newTop = bound.bottom - containerEle.offsetHeight;

    let newLeft = containerEle.offsetLeft - pos1;
    if (newLeft < bound.left) newLeft = bound.left;
    if (newLeft + containerEle.offsetWidth > bound.right)
      newLeft = bound.right - containerEle.offsetWidth;

    // set the element's new position:
    containerEle.style.top = `${newTop}px`;
    containerEle.style.left = `${newLeft}px`;
  }

  function closeDragElement() {
    setPosition({
      left: containerEle.style.left,
      top: containerEle.style.top,
    });

    setDragging(false);

    onDragEnd?.(containerEle);

    /* stop moving when mouse button is released: */
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function dragMouseDown(e: MouseEvent) {
    const _e = e || window.event;
    _e.preventDefault();

    // get the mouse cursor position at startup:
    pos3 = _e.clientX;
    pos4 = _e.clientY;

    setDragging(true);

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  if (draggableElement) {
    draggableElement.onmousedown = dragMouseDown;
  } else {
    containerEle.onmousedown = dragMouseDown;
  }
}

interface Params {
  isDraggable: boolean;
  containerID: string;
  isPickerOpen: boolean;
  dragElementID?: string;
}

export const useColorPickerPanelDraggable = (params: Params) => {
  // ------------------------------------------------------------------------------------------
  const { isDraggable, containerID, isPickerOpen, dragElementID } = params;

  // ------------------------------------------------------------------------------------------
  const [position, setPosition] = useState<DraggablePosition>({
    top: undefined,
    left: undefined,
  });

  const [isDragging, setDragging] = useState<boolean>(false);

  // ------------------------------------------------------------------------------------------
  const [draggableBound, setDraggableBound] = useState({
    top: 0,
    left: 0,
    right: typeof window !== "undefined" ? window.innerWidth : 1000,
    bottom: typeof window !== "undefined" ? window.innerHeight : 1000,
  });

  // ------------------------------------------------------------------------------------------
  useEffect(() => {
    if (!isDraggable) return () => undefined;

    const handler = () => {
      setDraggableBound({
        top: 0,
        left: 0,
        right: typeof window !== "undefined" ? window.innerWidth : 1000,
        bottom: typeof window !== "undefined" ? window.innerHeight : 1000,
      });
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [isDraggable]);

  // ------------------------------------------------------------------------------------------
  useEffect(() => {
    if (!isDraggable || !containerID) return;

    const container = document.getElementById(containerID);
    if (!container) return;

    if (position.left && position.top) {
      container.style.left = position.left;
      container.style.top = position.top;

      // ------------------------------------------------------------------------------------------
      // check if go off screen and move it into screen if it goes off screen
      const newPosition = {
        top: position.top,
        left: position.left,
      };

      if (replacePx(position.top) < draggableBound.top) {
        newPosition.top = `${draggableBound.top}px`;
        container.style.top = newPosition.top;
      }

      if (replacePx(position.left) < draggableBound.left) {
        newPosition.left = `${draggableBound.left}px`;
        container.style.left = newPosition.left;
      }

      if (
        replacePx(position.top) + container.offsetHeight >
        draggableBound.bottom
      ) {
        newPosition.top = `${draggableBound.bottom - container.offsetHeight}px`;
        container.style.top = newPosition.top;
      }

      if (
        replacePx(position.left) + container.offsetWidth >
        draggableBound.right
      ) {
        newPosition.left = `${draggableBound.right - container.offsetWidth}px`;
        container.style.left = newPosition.left;
      }

      setPosition(newPosition);
    }
  }, [
    isDraggable,
    containerID,
    position.left,
    position.top,
    draggableBound.right,
    draggableBound.left,
    draggableBound.top,
    draggableBound.bottom,
  ]);

  // set position for draggable container
  useEffect(() => {
    if (!isDraggable || !containerID) return;

    const container = document.getElementById(containerID);
    if (!container) return;

    const draggableElement = dragElementID
      ? document.getElementById(dragElementID)
      : undefined;

    dragElement({
      containerEle: container,
      draggableElement: draggableElement,
      bound: draggableBound,
      setPosition,
      setDragging,
    });
  }, [
    isDraggable,
    containerID,
    position.left,
    position.top,
    dragElementID,
    draggableBound,
    setPosition,
    setDragging,
  ]);

  // do not remember last position when close
  useEffect(() => {
    return () => {
      setPosition({
        top: undefined,
        left: undefined,
      });
    };
  }, [isPickerOpen]);

  return { isDragging };
};
