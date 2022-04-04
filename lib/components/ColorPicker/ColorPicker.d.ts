/// <reference types="react" />
import { Hex } from "../../utils/colorTypes";
interface ColorPickerProps {
    hex: Hex;
    alpha: number;
    onColorChange: (updatedHex: Hex) => void;
    onAlphaChange: (alpha: number) => void;
}
declare const ColorPicker: (props: ColorPickerProps) => JSX.Element;
export default ColorPicker;
