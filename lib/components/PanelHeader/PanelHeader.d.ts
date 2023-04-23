/// <reference types="react" />
import { ComponentColorType, Theme } from "../../types/colorGradientPicker";
interface PanelHeaderProps {
    value: ComponentColorType;
    onChange: (value: ComponentColorType) => void;
    onClosePanel: () => void;
    colorSelectType?: ComponentColorType | "all";
    draggableID?: string;
    theme?: Theme;
}
export declare const PanelHeader: ({ value, onChange, colorSelectType, onClosePanel, draggableID, theme, }: PanelHeaderProps) => JSX.Element;
export {};
