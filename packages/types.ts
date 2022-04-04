import { PalletteColor } from "./components/GradientPicker/types";
import { InputProps } from "./components/Input/types";
import { Hex } from "./utils/colorTypes";

export enum COLOR_TYPE {
  SOLID = "SOLID",
  LINEAR = "LINEAR",
}

export interface GradientColor {
  degree: number;
  palette: PalletteColor[];
}

export interface ColorValue {
  alpha?: number;
  solid?: Hex;
  gradient?: GradientColor;
  type?: COLOR_TYPE;
}

export interface ColorGradientPickerProps extends Omit<InputProps, "onChange"> {
  color: ColorValue;
  onChange: (color: ColorValue) => void;
  colorPickingPanelClassName?: string;
  hasAlphaInput?: boolean;
  classNamePrefix?: string;
  className?: string;
}
