import clsx from "clsx";
import { HTMLProps, useState } from "react";

import s from "./Input.module.css";
import {
  InputColorPreviewProps,
  InputProps,
  InputTextInfoProps,
} from "./types";

function InputColorPreview(props: InputColorPreviewProps) {
  const { value, className } = props;

  return (
    <div
      style={{ background: value }}
      className={clsx(s.color_preview, className)}
    />
  );
}

function InputTextInfo(props: InputTextInfoProps) {
  const { children, className } = props;

  return <div className={clsx(s.text_info, className)}>{children}</div>;
}

function Input(props: InputProps) {
  // ------------------------------------------------------------------------------------------
  const {
    className,
    info,
    label,
    style,
    inputWrapperClassName,
    inputProps,
    placeholder,
    onInputFocus,
    onInputBlur,
    value,
  } = props;

  // ------------------------------------------------------------------------------------------
  const [isFocus, setFocus] = useState<boolean>();

  return (
    <div className={clsx(s.container, className)} style={style}>
      {label && <div className={clsx(s.label)}>{label}</div>}

      <div
        className={clsx(s.wrapper, isFocus && s.isFocus, inputWrapperClassName)}
      >
        <div className={clsx(s.info)}>{info}</div>

        <input
          {...inputProps}
          onFocus={(e) => {
            if (typeof onInputFocus === "function") onInputFocus(e);
            setFocus(true);
          }}
          onBlur={(e) => {
            if (typeof onInputBlur === "function") onInputBlur(e);
            setFocus(false);
          }}
          placeholder={placeholder}
          className={clsx(s.input)}
          value={value}
        />
      </div>
    </div>
  );
}

function Rgb(props: InputProps) {
  const { inputProps, info, ...rest } = props;

  const customInputProps: HTMLProps<HTMLInputElement> = {
    ...inputProps,
    type: "number",
    min: 0,
    max: 255,
  };

  return (
    <Input
      {...rest}
      info={<InputTextInfo>{info}</InputTextInfo>}
      inputProps={customInputProps}
    />
  );
}

function Alpha(props: InputProps) {
  const { inputProps, info, ...rest } = props;

  const customInputProps: HTMLProps<HTMLInputElement> = {
    ...inputProps,
    type: "number",
    min: 0,
    max: 1,
  };

  return (
    <Input
      {...rest}
      info={<InputTextInfo>{info}</InputTextInfo>}
      inputProps={customInputProps}
    />
  );
}

function Color(props: InputProps) {
  const { value, ...rest } = props;

  delete rest.info;

  return (
    <Input
      {...rest}
      value={value}
      info={<InputColorPreview value={(value as string) || "#000"} />}
    />
  );
}

Input.Alpha = Alpha;
Input.Rgb = Rgb;
Input.Color = Color;

export default Input;
