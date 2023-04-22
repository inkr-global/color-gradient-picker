import { CSSProperties } from "react";

import { Alpha, Gradient, Hex } from "./color";
import { UserInputProps } from "./userInput";

export type ComponentColorType = "linear-gradient" | "solid";

export type ComponentPanelPlacement =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export interface ComponentColorValue {
  alpha?: Alpha;
  solid?: Hex;
  gradient?: Gradient;
  type?: ComponentColorType;
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
  color: ComponentColorValue;
  onChange: (color: ComponentColorValue) => void;
  panelPlacement?: ComponentPanelPlacement;
  colorSelectType?: ComponentColorType | "all";
  panelClassName?: string;
  hasAlphaInput?: boolean;
  classNamePrefix?: string;
  className?: string;
  style?: CSSProperties;
  panelStyle?: CSSProperties;
  isDraggable?: boolean;
  theme?: "light" | "dark";
}
