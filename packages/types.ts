import { CSSProperties, ReactElement, ReactText } from "react";

interface BaseProps {
  classNamePrefix?: string;
  className?: string;
}

export type ColorGradientPickerProps = BaseProps;

export interface InputProps extends BaseProps {
  inputWrapperClassName?: string;
  info: ReactElement;
  label?: string;
  style?: CSSProperties;
  hasExtraInput?: boolean;
}

export interface InputColorPreviewProps extends BaseProps {
  value: string;
}

export interface InputTextInfoProps extends BaseProps {
  children: ReactText;
}
