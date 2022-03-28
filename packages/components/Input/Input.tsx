import clsx from "clsx";
import React, { HTMLProps, useState } from "react";

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

function InputAlphaInfo() {
  return <div className={s.alpha_info} />;
}

function Input(props: InputProps) {
  // ------------------------------------------------------------------------------------------
  const {
    className,
    info,
    label,
    style,
    inputWrapperClassName,
    inputClassName,
    inputProps,
    placeholder,
    onInputFocus,
    onInputBlur,
    onChange,
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
            e.target.select();
            setFocus(true);
          }}
          onBlur={(e) => {
            if (typeof onInputBlur === "function") onInputBlur(e);
            setFocus(false);
          }}
          placeholder={placeholder}
          className={clsx(s.input, inputClassName)}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

function Rgb(
  props: Omit<InputProps, "onChange"> & { onChange: (value: number) => void },
) {
  const { inputProps, info, onChange, ...rest } = props;

  const customInputProps: HTMLProps<HTMLInputElement> = {
    ...inputProps,
    type: "number",
    min: 0,
    max: 255,
  };

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = parseInt(e.currentTarget.value);
    if (value < 0 || value > 255) return;
    onChange(value);
  };

  return (
    <Input
      {...rest}
      onChange={_onChange}
      info={<InputTextInfo>{info}</InputTextInfo>}
      inputProps={customInputProps}
    />
  );
}

function Alpha(
  props: Omit<InputProps, "onChange"> & { onChange: (value: number) => void },
) {
  const { onChange, value, ...rest } = props;

  delete rest.info;

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const _value = e.currentTarget.value.replace("%", "");
    let value = Math.round(parseInt(_value));
    if (value < 0) value = 0;
    if (value > 100) value = 100;
    onChange(value);
  };

  return (
    <Input
      {...rest}
      info={<InputAlphaInfo />}
      onChange={_onChange}
      value={value + "%"}
      inputClassName={s.alpha_input}
    />
  );
}

function ColorHex(
  props: Omit<InputProps, "onChange"> & { onChange: (value: string) => void },
) {
  const { value, onChange, ...rest } = props;

  delete rest.info;

  const _onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const _value = e.currentTarget.value;

    onChange(_value);
  };

  return (
    <Input
      {...rest}
      onChange={_onChange}
      value={value}
      info={<InputColorPreview value={(value as string) || "#000"} />}
    />
  );
}

Input.Alpha = Alpha;
Input.Rgb = Rgb;
Input.ColorHex = ColorHex;

export default Input;
