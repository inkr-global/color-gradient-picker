import { InputProps } from "./components/Input/types";
import { Hex } from "./utils/colorTypes";

export enum VALUE_COLOR_TYPE {
  SOLID = "SOLID",
  GRADIENT = "GRADIENT",
}

export interface ColorValue {
  alpha?: number;
  hex?: Hex;
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
