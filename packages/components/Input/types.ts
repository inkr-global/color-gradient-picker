import { CSSProperties, HTMLProps, ReactElement, ReactText } from "react";

export interface InputProps {
  info: ReactElement;
  label?: string;
  style?: CSSProperties;
  placeholder?: string;
  inputProps?: HTMLProps<HTMLInputElement>;
  onInputFocus?: React.FocusEventHandler<HTMLInputElement>;
  onInputBlur?: React.FocusEventHandler<HTMLInputElement>;
  value?: string | number;
  extraInputValue?: string | number;
  inputWrapperClassName?: string;
  className?: string;
}

export interface InputColorPreviewProps {
  value: string;
  className?: string;
}

export interface InputTextInfoProps {
  children: ReactText;
  className?: string;
}
