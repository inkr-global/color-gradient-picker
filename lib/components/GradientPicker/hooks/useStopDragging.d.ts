import { DragEventHandler } from "react";
import { GradientLimits, GradientStop } from "../types";
interface Params {
    stop: GradientStop;
    limits: GradientLimits;
    colorStopRef: React.RefObject<HTMLDivElement>;
    onPosChange: (id: number, offset: number) => void;
    onDeleteColor: (id: number) => void;
    onDragStart: (id: number) => void;
    onDragEnd: (id: number) => void;
}
declare const useStopDragging: ({ limits, stop, colorStopRef, onPosChange, onDragStart, onDragEnd, onDeleteColor, }: Params) => (DragEventHandler<Element> | import("react").TouchEventHandler<Element> | ((e: MouseEvent, handler: {
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
} | {
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
}) => void))[];
export default useStopDragging;
