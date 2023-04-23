interface Params {
    isDraggable: boolean;
    containerID: string;
    isPickerOpen: boolean;
    dragElementID?: string;
}
export declare const useColorPickerPanelDraggable: (params: Params) => {
    isDragging: boolean;
};
export {};
