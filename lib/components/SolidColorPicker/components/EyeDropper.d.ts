/// <reference types="react" />
import { ColorGradientPickerTheme } from "../../../types/colorGradientPicker";
interface EyeDropperProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    theme?: ColorGradientPickerTheme;
}
declare const EyeDropper: ({ onClick, theme }: EyeDropperProps) => JSX.Element;
export default EyeDropper;
