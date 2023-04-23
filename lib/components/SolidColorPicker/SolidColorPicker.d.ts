/// <reference types="react" />
import { Alpha, Hex } from "../../types/color";
import { Theme } from "../../types/colorGradientPicker";
interface ColorPickerProps {
    hex: Hex;
    alpha: Alpha;
    onColorChange: (updatedHex: Hex) => void;
    onAlphaChange: (alpha: Alpha) => void;
    hasAlphaInput?: boolean;
    theme: Theme;
}
export declare const SolidColorPicker: (props: ColorPickerProps) => JSX.Element;
export {};
