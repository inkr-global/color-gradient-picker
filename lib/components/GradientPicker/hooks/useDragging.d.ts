import { DragEventHandler, TouchEventHandler } from "react";
declare const DRAG_HANDLERS: {
    MOUSE: {
        stop: (e: MouseEvent) => void;
        coordinates: ({ clientX, clientY }: MouseEvent) => {
            clientX: number;
            clientY: number;
        };
        dragEvent: {
            name: any;
        };
        dragEndEvent: {
            name: any;
        };
    };
    TOUCH: {
        stop: () => undefined;
        coordinates: (e: TouchEvent) => {
            clientX: any;
            clientY: any;
        };
        dragEvent: {
            name: any;
            options: {
                cancelable: boolean;
                passive: boolean;
            };
        };
        dragEndEvent: {
            name: any;
        };
    };
};
interface UseDraggingParams {
    onDragStart: DragEventHandler;
    onDrag: DragEventHandler;
    onDragEnd: DragEventHandler;
}
declare const useDragging: ({ onDragStart, onDrag, onDragEnd }: UseDraggingParams) => (DragEventHandler<Element> | TouchEventHandler<Element> | ((e: MouseEvent, handler: typeof DRAG_HANDLERS.MOUSE | typeof DRAG_HANDLERS.TOUCH) => void))[];
export default useDragging;
