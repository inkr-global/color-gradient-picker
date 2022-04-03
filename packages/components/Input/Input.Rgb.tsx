import React, { HTMLProps, ReactNode, useEffect, useState } from "react";

import { KEYS, RGB_VALUE } from "./contstants";
import { Input } from "./Input";
import s from "./Input.Rgb.module.css";
import { InputProps } from "./types";

function InputTextInfo(props: { children: ReactNode }) {
  const { children } = props;

  return <div className={s.input_text}>{children}</div>;
}

// ------------------------------------------------------------------------------------------
export function Rgb(
  props: Omit<InputProps, "onChange" | "value"> & {
    onChange: (value: number) => void;
    value: number;
  },
) {
  const { inputProps, info, onChange, value, onInputBlur, ...rest } = props;

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
    if (isNaN(_value)) _value = RGB_VALUE.MIN;
    setValueState(_value);
  };

  const _onOutsideChange = () => {
    onChange(valueState as number);
    setValueState(valueState);
  };

  const _onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === KEYS.ENTER) _onOutsideChange();
  };

  const _onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    _onOutsideChange();
    if (typeof onInputBlur === "function") onInputBlur(e);
  };

  // -----------------------------------------------------------------------
  return (
    <Input
      {...rest}
      onChange={_onInternalChange}
      onKeyDown={_onKeyDown}
      value={valueState}
      onInputBlur={_onBlur}
      info={<InputTextInfo>{info}</InputTextInfo>}
      inputProps={customInputProps}
    />
  );
}
