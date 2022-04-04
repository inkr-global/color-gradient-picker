import { DragEventHandler, TouchEventHandler } from "react";
declare const DRAG_HANDLERS: {
    MOUSE: {
        stop: (e: MouseEvent) => void;
        coordinates: ({ clientX, clientY }: MouseEvent) => {
            clientX: number;
            clientY: number;
        };
        dragEvent: {
            name: string;
        };
        dragEndEvent: {
            name: string;
        };
    };
    TOUCH: {
        stop: () => undefined;
        coordinates: (e: TouchEvent) => {
            clientX: any;
            clientY: any;
        };
        dragEvent: {
            name: string;
            options: {
                cancelable: boolean;
                passive: boolean;
            };
        };
        dragEndEvent: {
            name: string;
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
