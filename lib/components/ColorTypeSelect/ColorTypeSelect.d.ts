/// <reference types="react" />
import { ColorType } from "../../ColorGradientPicker.types";
interface ColorTypeSelectProps {
    value: ColorType;
    onChange: (value: ColorType) => void;
}
declare const ColorTypeSelect: ({ value, onChange }: ColorTypeSelectProps) => JSX.Element;
export default ColorTypeSelect;
