import { CSSProperties } from "react";

import { Alpha, Gradient, Hex } from "./color";
import { ColorInputCoreProps } from "./colorInput";


export type ColorGradientPickerColorType = "linear-gradient" | "solid";

export type ColorGradientPickerTheme = "light" | "dark";

export type ColorGradientPickerPanelPlacement =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface ColorGradientPickerValue {
  alpha?: Alpha;
  solid?: Hex;
  gradient?: Gradient;
  type?: ColorGradientPickerColorType;
}

export interface UserInputProps extends ColorInputCoreProps {
  color: ColorGradientPickerValue | undefined;
  onSolidColorChange: (hex: Hex) => void;
  onAlphaChange: (alpha: Alpha) => void;
  onColorPreviewClick?: React.MouseEventHandler<HTMLDivElement>;
  hasAlphaInput?: boolean;
  theme?: ColorGradientPickerTheme;
  onEyeDropperOpenChanged?: (open: boolean) => void;
}

export interface ColorGradientPickerProps
  extends Omit<
  UserInputProps,
  | "onChange"
  | "onAlphaChange"
  | "onSolidColorChange"
  | "color"
  | "hasAlphaInput"
  | "style"
  | "value"
  > {
  color: ColorGradientPickerValue | undefined;
  onEyeDropperOpenChanged?: (open: boolean) => void;
  onChange: (color: ColorGradientPickerValue) => void;
  panelPlacement?: ColorGradientPickerPanelPlacement;
  colorSelectType?: ColorGradientPickerColorType | "all";
  panelClassName?: string;
  hasAlphaInput?: boolean;
  classNamePrefix?: string;
  className?: string;
  style?: CSSProperties;
  panelStyle?: CSSProperties;
  isDraggable?: boolean;
  theme?: ColorGradientPickerTheme;
}
