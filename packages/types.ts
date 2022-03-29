import { Hex } from "./utils/colorTypes";

export interface ColorValue {
  alpha?: number;
  hex?: Hex;
}

export interface ColorGradientPickerProps {
  classNamePrefix?: string;
  className?: string;
  value?: ColorValue;
  onChange: (value: ColorValue) => void;
}
