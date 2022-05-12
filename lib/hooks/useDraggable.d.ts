interface Params {
    isDraggable: boolean;
    containerID: string;
    isPickerOpen: boolean;
    dragElementID?: string;
}
export declare const useDraggable: (params: Params) => {
    isDragging: boolean;
};
export {};
