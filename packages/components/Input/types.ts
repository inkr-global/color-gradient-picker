import { CSSProperties, HTMLProps, ReactNode } from "react";


export interface InputProps {
  info?: ReactNode;
  label?: string;
  style?: CSSProperties;
  placeholder?: string;
  inputProps?: HTMLProps<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onInputFocus?: React.FocusEventHandler<HTMLInputElement>;
  onInputBlur?: React.FocusEventHandler<HTMLInputElement>;
  value?: string | number;
  extraInputValue?: string | number;
  inputWrapperClassName?: string;
  inputClassName?: string;
  className?: string;
}

export interface InputColorPreviewProps {
  value: string;
  className?: string;
}

export interface InputTextInfoProps {
  children: ReactNode;
  className?: string;
}
