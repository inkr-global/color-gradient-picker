import { InputProps } from "./components/Input/types";
import { Hex } from "./utils/colorTypes";

export interface ColorValue {
  alpha?: number;
  hex?: Hex;
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
