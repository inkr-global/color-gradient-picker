import { CSSProperties, ReactElement } from "react";

export interface ColorGradientPickerProps {
  classNamePrefix?: string;
  className?: string;
}


export interface InputProps {
  classNamePrefix: string;
  className?: string;
  inputWrapperClassName?: string;
  info: ReactElement;
  label?: string;
  style?: CSSProperties;
  hasExtraInput?: boolean;
}


export interface InputColorPreviewProps {
  value: string;
}