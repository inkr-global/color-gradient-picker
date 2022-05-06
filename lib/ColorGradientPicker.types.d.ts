import { CSSProperties } from "react";
import { Alpha, Gradient, Hex } from "./colorTypes";
import { InputProps } from "./components/Input/types";
export declare type ColorType = "linear-gradient" | "solid";
export declare type panelPlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left";
export interface ColorValue {
    alpha?: Alpha;
    solid?: Hex;
    gradient?: Gradient;
    type?: ColorType;
}
export interface UserInputProps extends InputProps {
    color: ColorValue;
    onSolidColorChange: (hex: Hex) => void;
    onAlphaChange: (alpha: Alpha) => void;
    hasAlphaInput?: boolean;
}
export interface ColorGradientPickerProps extends Omit<UserInputProps, "onChange" | "color" | "hasAlphaInput" | "style" | "value"> {
    color: ColorValue;
    onChange: (color: ColorValue) => void;
    panelPlacement?: panelPlacement;
    colorSelectType?: ColorType | "all";
    colorPickingPanelClassName?: string;
    hasAlphaInput?: boolean;
    classNamePrefix?: string;
    className?: string;
    style?: CSSProperties;
}
