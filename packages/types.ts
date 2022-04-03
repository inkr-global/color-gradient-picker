import { PalletteColor } from "./components/GradientPicker/types";
import { InputProps } from "./components/Input/types";
import { Hex } from "./utils/colorTypes";

export enum VALUE_COLOR_TYPE {
  SOLID = "SOLID",
  GRADIENT = "GRADIENT",
}

export interface GradientColor {
  degree: number;
  palette: PalletteColor[];
}

export interface ColorValue {
  alpha?: number;
  solid?: Hex;
  gradient?: GradientColor;
  type?: VALUE_COLOR_TYPE;
}

export interface ColorGradientPickerProps {
  value?: ColorValue;
  onChange: (value: ColorValue) => void;
  classNamePrefix?: string;
  className?: string;
  inputWidth?: InputProps["inputWidth"];
  onInputBlur?: InputProps["onInputBlur"];
  onKeyDown?: InputProps["onKeyDown"];
}
