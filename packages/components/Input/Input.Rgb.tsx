import React, { HTMLProps, ReactNode, useEffect, useState } from "react";

import { KEYS, RGB_VALUE } from "./constants";
import { InputBase } from "./Input.Base";
import s from "./styles/Input.Rgb.module.css";
import { BaseInputProps } from "./types";


function InputTextInfo(props: { children: ReactNode }) {
  const { children } = props;

  return <div className={s.input_text}>{children}</div>;
}

// ------------------------------------------------------------------------------------------
export function InputRgb(
  props: Omit<BaseInputProps, "onChange" | "value"> & {
    onChange: (value: number) => void;
    value: number;
    theme?: "light" | "dark";
  },
) {
  const { inputProps, info, onChange, value, onInputBlur, theme, ...rest } = props;

  const [valueState, setValueState] = useState<number>(value);

  const customInputProps: HTMLProps<HTMLInputElement> = {
    ...inputProps,
    type: "number",
    min: RGB_VALUE.MIN,
    max: RGB_VALUE.MAX,
  };

  // -----------------------------------------------------------------------
  useEffect(() => {
    setValueState(value);
  }, [value]);

  // -----------------------------------------------------------------------
  const _onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let _value = parseInt(e.currentTarget.value);
    if (_value < RGB_VALUE.MIN) _value = RGB_VALUE.MIN;
    if (_value > RGB_VALUE.MAX) _value = RGB_VALUE.MAX;
    if (Number.isNaN(_value)) _value = RGB_VALUE.MIN;
    setValueState(_value);
  };

  const _onOutsideChange = () => {
    onChange(valueState as number);
    setValueState(valueState);
  };

  const _onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    if (e.key === KEYS.ENTER) _onOutsideChange();
  };

  const _onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    _onOutsideChange();
    if (typeof onInputBlur === "function") onInputBlur(e);
  };

  // -----------------------------------------------------------------------
  return (
    <InputBase
      {...rest}
      onChange={_onInternalChange}
      onKeyDown={_onKeyDown}
      value={valueState}
      onInputBlur={_onBlur}
      info={<InputTextInfo>{info}</InputTextInfo>}
      inputProps={customInputProps}
      theme={theme}
    />
  );
}
