import React, { HTMLProps, ReactNode, useEffect, useState } from "react";

import { ENTER_KEY, Input } from "./Input";
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
    min: 0,
    max: 255,
  };

  // -----------------------------------------------------------------------
  useEffect(() => {
    setValueState(value);
  }, [value]);

  // -----------------------------------------------------------------------
  const _onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let _value = parseInt(e.currentTarget.value);
    if (_value < 0) _value = 0;
    if (_value > 255) _value = 255;
    if (isNaN(_value)) _value = 0;
    setValueState(_value);
  };

  const _onOutsideChange = () => {
    onChange(valueState as number);
    setValueState(valueState);
  };

  const _onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === ENTER_KEY) _onOutsideChange();
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
