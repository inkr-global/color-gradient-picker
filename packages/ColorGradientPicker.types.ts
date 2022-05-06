import { Alpha, Gradient, Hex } from "./colorTypes";
import { InputProps } from "./components/Input/types";


export type ColorType = "linear-gradient" | "solid";

export type PickerPlacement = "top-right" | "top-left" | "bottom-right" | "bottom-left";

export interface ColorValue {
  alpha?: Alpha;
  solid?: Hex;
  gradient?: Gradient;
  type?: ColorType;
}

export interface ColorGradientPickerProps extends Omit<InputProps, "onChange"> {
  color: ColorValue;
  onChange: (color: ColorValue) => void;
  pickerPlacement?: PickerPlacement;
  colorSelectType?: ColorType | "all";
  colorPickingPanelClassName?: string;
  hasAlphaInput?: boolean;
  classNamePrefix?: string;
  className?: string;
}
