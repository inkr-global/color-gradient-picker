/// <reference types="react" />
import { Alpha, Hex } from "./color";
import { ComponentColorValue, Theme } from "./colorGradientPicker";
import { ColorInputCoreProps } from "./colorInput";
export interface UserInputProps extends ColorInputCoreProps {
    color: ComponentColorValue | undefined;
    onSolidColorChange: (hex: Hex) => void;
    onAlphaChange: (alpha: Alpha) => void;
    onColorPreviewClick?: React.MouseEventHandler<HTMLDivElement>;
    hasAlphaInput?: boolean;
    theme?: Theme;
}
