import { CSSProperties, HTMLProps, ReactElement, ReactText } from "react";

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
  placeholder?: string;
  inputProps?: HTMLProps<HTMLInputElement>;
  extraPlaceholder?: string;
  extraInputProps?: HTMLProps<HTMLInputElement>;
}

export interface InputColorPreviewProps extends BaseProps {
  value: string;
}

export interface InputTextInfoProps extends BaseProps {
  children: ReactText;
}
