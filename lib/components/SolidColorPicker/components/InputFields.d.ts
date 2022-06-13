/// <reference types="react" />
import { Alpha, Hex, Hsv, Rgb } from "../../../types/color";
interface InputFieldsProps {
    hex: Hex;
    alpha: Alpha;
    rgb: Rgb;
    setColor: (hex: Hex, hsv: Hsv) => void;
    setAlpha: (alpha: Alpha) => void;
    setColorFromRgb: (rgb: Rgb) => void;
    hasAlphaInput?: boolean;
    theme?: "light" | "dark";
}
declare const InputFields: (props: InputFieldsProps) => JSX.Element;
export default InputFields;
