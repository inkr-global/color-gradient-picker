import { Alpha, Hex } from "./color";
import { ComponentColorValue } from "./colorGradientPicker";
import { ColorInputCoreProps } from "./colorInput";

export interface UserInputProps extends ColorInputCoreProps {
  color: ComponentColorValue;
  onSolidColorChange: (hex: Hex) => void;
  onAlphaChange: (alpha: Alpha) => void;
  onColorPreviewClick?: React.MouseEventHandler<HTMLDivElement>;
  hasAlphaInput?: boolean;
  theme?: "light" | "dark";
}
