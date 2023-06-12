/// <reference types="react" />
import { ColorGradientPickerTheme } from "../../../types/colorGradientPicker";
interface EyeDropperProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    theme?: ColorGradientPickerTheme;
}
export declare const EyeDropper: import("react").MemoExoticComponent<({ onClick, theme }: EyeDropperProps) => JSX.Element>;
export {};
