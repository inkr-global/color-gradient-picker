/// <reference types="react" />
import { Alpha, Hex } from "../../colorTypes";
interface ColorPickerProps {
    hex: Hex;
    alpha: Alpha;
    onColorChange: (updatedHex: Hex) => void;
    onAlphaChange: (alpha: Alpha) => void;
}
declare const ColorPicker: (props: ColorPickerProps) => JSX.Element;
export default ColorPicker;
