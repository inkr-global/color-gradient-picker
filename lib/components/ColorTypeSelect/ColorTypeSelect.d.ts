/// <reference types="react" />
import { ColorType } from "../../ColorGradientPicker.types";
interface ColorTypeSelectProps {
    value: ColorType;
    onChange: (value: ColorType) => void;
    onClosePanel: () => void;
    colorSelectType?: ColorType | "all";
    id?: string;
}
declare const ColorTypeSelect: ({ value, onChange, colorSelectType, onClosePanel, id, }: ColorTypeSelectProps) => JSX.Element;
export default ColorTypeSelect;
