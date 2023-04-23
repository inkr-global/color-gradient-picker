/// <reference types="react" />
import { Theme } from "../../../types/colorGradientPicker";
interface EyeDropperProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    theme?: Theme;
}
declare const EyeDropper: ({ onClick, theme }: EyeDropperProps) => JSX.Element;
export default EyeDropper;
