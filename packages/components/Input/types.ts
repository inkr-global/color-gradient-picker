import React, {
  CSSProperties,
  HTMLProps,
  ReactElement,
  ReactNode,
} from "react";


export interface BaseInputProps {
  value?: string | number;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onInputFocus?: React.FocusEventHandler<HTMLInputElement>;
  onInputBlur?: React.FocusEventHandler<HTMLInputElement>;

  info?: ReactNode;
  label?: string;
  placeholder?: string;

  style?: CSSProperties;
  className?: string;

  inputWidth?: number;
  inputProps?: HTMLProps<HTMLInputElement>;
  inputWrapperClassName?: string;
  inputClassName?: string;

  extraInput?: ReactElement;
  isExtraComponent?: boolean;
}
