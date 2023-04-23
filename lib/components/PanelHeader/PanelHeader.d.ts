/// <reference types="react" />
import { ColorGradientPickerColorType, ColorGradientPickerTheme } from "../../types/colorGradientPicker";
interface PanelHeaderProps {
    value: ColorGradientPickerColorType;
    onChange: (value: ColorGradientPickerColorType) => void;
    onClosePanel: () => void;
    colorSelectType?: ColorGradientPickerColorType | "all";
    draggableID?: string;
    theme?: ColorGradientPickerTheme;
}
export declare const PanelHeader: ({ value, onChange, colorSelectType, onClosePanel, draggableID, theme, }: PanelHeaderProps) => JSX.Element;
export {};
