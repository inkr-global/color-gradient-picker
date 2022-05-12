/// <reference types="react" />
import { ColorType } from "../../ColorGradientPicker.types";
interface ColorTypeSelectProps {
    value: ColorType;
    onChange: (value: ColorType) => void;
    onClosePanel: () => void;
    colorSelectType?: ColorType | "all";
    draggableID?: string;
}
declare const ColorTypeSelect: ({ value, onChange, colorSelectType, onClosePanel, draggableID, }: ColorTypeSelectProps) => JSX.Element;
export default ColorTypeSelect;
