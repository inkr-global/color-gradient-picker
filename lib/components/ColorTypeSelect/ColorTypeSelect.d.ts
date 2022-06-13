/// <reference types="react" />
import { ColorType } from "../../ColorGradientPicker.types";
interface ColorTypeSelectProps {
    value: ColorType;
    onChange: (value: ColorType) => void;
    onClosePanel: () => void;
    colorSelectType?: ColorType | "all";
    draggableID?: string;
    theme?: "light" | "dark";
}
declare const ColorTypeSelect: ({ value, onChange, colorSelectType, onClosePanel, draggableID, theme }: ColorTypeSelectProps) => JSX.Element;
export default ColorTypeSelect;
