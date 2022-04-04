/// <reference types="react" />
import { Alpha, Hex, Hsv, Rgb } from "../../../../colorTypes";
interface InputFieldsProps {
    hex: Hex;
    alpha: Alpha;
    rgb: Rgb;
    setColor: (hex: Hex, hsv: Hsv) => void;
    setAlpha: (alpha: Alpha) => void;
    setColorFromRgb: (rgb: Rgb) => void;
}
declare const InputFields: (props: InputFieldsProps) => JSX.Element;
export default InputFields;
