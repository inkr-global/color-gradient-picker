/// <reference types="react" />
import { Alpha, Hex, Hsv, Rgb } from "../../../types/color";
interface InputFieldsProps {
    hex: Hex;
    alpha: Alpha;
    rgb: Rgb;
    setAlpha: (alpha: Alpha) => void;
    setHexColor: (hex: Hex, hsv: Hsv) => void;
    setColorFromRgb: (rgb: Rgb) => void;
    hasAlphaInput?: boolean;
}
export declare const InputFields: (props: InputFieldsProps) => JSX.Element;
export {};
