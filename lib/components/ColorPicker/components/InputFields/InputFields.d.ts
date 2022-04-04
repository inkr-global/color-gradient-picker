/// <reference types="react" />
import { Hex, Hsv, Rgb } from "../../../../utils/colorTypes";
interface InputFieldsProps {
    hex: Hex;
    alpha: number;
    rgb: Rgb;
    setColor: (hex: Hex, hsv: Hsv) => void;
    setAlpha: (alpha: number) => void;
    setColorFromRgb: (rgb: Rgb) => void;
}
declare const InputFields: (props: InputFieldsProps) => JSX.Element;
export default InputFields;
