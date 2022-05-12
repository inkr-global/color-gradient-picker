interface Params {
    isDraggable: boolean;
    containerID: string;
    dragElementID?: string;
}
export declare const useDraggable: (params: Params) => {
    isDragging: boolean;
};
export {};
