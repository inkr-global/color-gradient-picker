import { PalletteColor } from "./components/GradientPicker/types";
import { InputProps } from "./components/Input/types";
import { Hex } from "./utils/colorTypes";

export type ColorType = "linear" | "solid";

export interface Gradient {
  degree: number;
  points: PalletteColor[];
}

export interface ColorValue {
  alpha?: number;
  solid?: Hex;
  gradient?: Gradient;
  type?: ColorType;
}

export interface ColorGradientPickerProps extends Omit<InputProps, "onChange"> {
  color: ColorValue;
  onChange: (color: ColorValue) => void;
  colorPickingPanelClassName?: string;
  hasAlphaInput?: boolean;
  classNamePrefix?: string;
  className?: string;
}
