import { CSSProperties } from "react";

import { Alpha, Gradient, Hex } from "./color";
import { ColorInputCoreProps } from "./colorInput";


export type ColorGradientPickerColorType = "linear-gradient" | "solid";


export type ColorGradientPickerTheme = "light" | "dark";


export type ColorGradientPickerPanelPlacement = (
  "top-right" |
  "top-left" |
  "bottom-right" |
  "bottom-left"
);


export interface ColorGradientPickerValue {
  alpha?: Alpha;
  solid?: Hex;
  gradient?: Gradient;
  type?: ColorGradientPickerColorType;
}


export interface UserInputProps extends ColorInputCoreProps {

  color: ColorGradientPickerValue | undefined;
  onSolidColorChange: (hex: Hex) => void;

  hasAlphaInput?: boolean;
  onAlphaChange: (alpha: Alpha) => void;

  theme?: ColorGradientPickerTheme;
  onColorPreviewClick?: React.MouseEventHandler<HTMLDivElement>;
  onEyeDropperOpenChanged?: (open: boolean) => void;
}


export interface ColorGradientPickerProps extends Omit<UserInputProps, (
  "value" |
  "onChange" |
  "onAlphaChange" |
  "onSolidColorChange"
)> {

  onChange: (color: ColorGradientPickerValue) => void;

  colorSelectType?: ColorGradientPickerColorType | "all";
  isDraggable?: boolean;

  panelPlacement?: ColorGradientPickerPanelPlacement;
  panelClassName?: string;
  panelStyle?: CSSProperties;
}
