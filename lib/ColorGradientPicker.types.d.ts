import { CSSProperties } from "react";
import { BaseInputProps } from "./components/Input/types";
import { Alpha, Gradient, Hex } from "./types/color";
export declare type ColorType = "linear-gradient" | "solid";
export declare type PanelPlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left";
export interface ColorValue {
    alpha?: Alpha;
    solid?: Hex;
    gradient?: Gradient;
    type?: ColorType;
}
export interface UserInputProps extends BaseInputProps {
    color: ColorValue;
    onSolidColorChange: (hex: Hex) => void;
    onAlphaChange: (alpha: Alpha) => void;
    hasAlphaInput?: boolean;
}
export interface ColorGradientPickerProps extends Omit<UserInputProps, "onChange" | "onAlphaChange" | "onSolidColorChange" | "color" | "hasAlphaInput" | "style" | "value"> {
    color: ColorValue;
    onChange: (color: ColorValue) => void;
    panelPlacement?: PanelPlacement;
    colorSelectType?: ColorType | "all";
    panelClassName?: string;
    hasAlphaInput?: boolean;
    classNamePrefix?: string;
    className?: string;
    style?: CSSProperties;
    panelStyle?: CSSProperties;
}
