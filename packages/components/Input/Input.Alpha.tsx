import React, { useEffect, useState } from "react";

import { ALPHA_VALUE, KEYS } from "./contstants";
import { Input } from "./Input";
import s from "./Input.Alpha.module.css";
import { InputProps } from "./types";

function InputAlphaInfo() {
  return <div className={s.alpha_info} />;
}

const ALPHA_SYMBOL = "%";

const getAlphaString = (alpha: number) => `${alpha}${ALPHA_SYMBOL}`;

export function Alpha(
  props: Omit<InputProps, "onChange" | "info" | "value"> & {
    onChange: (value: number) => void;
    value: number;
  },
) {
  const { value, onChange, onInputBlur, ...rest } = props;

  const [valueState, setValueState] = useState<string>(getAlphaString(value));

  // -----------------------------------------------------------------------
  useEffect(() => {
    setValueState(getAlphaString(value));
  }, [value]);

  // -----------------------------------------------------------------------
  const _onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let _value = parseInt(e.currentTarget.value.replace(ALPHA_SYMBOL, ""));
    _value = Math.round(_value);
    if (_value < ALPHA_VALUE.MIN) _value = ALPHA_VALUE.MIN;
    if (_value > ALPHA_VALUE.MAX) _value = ALPHA_VALUE.MAX;
    if (isNaN(_value)) _value = ALPHA_VALUE.MIN;

    setValueState(getAlphaString(_value));
  };

  const _onOutsideChange = () => {
    // remove % if the valueState has it
    const _valueState = parseInt(
      (valueState?.toString() || ALPHA_VALUE.MAX.toString())?.replace(ALPHA_SYMBOL, ""),
    );
    onChange(_valueState);
    setValueState(getAlphaString(_valueState));
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
      info={<InputAlphaInfo />}
      onChange={_onInternalChange}
      onKeyDown={_onKeyDown}
      onInputBlur={_onBlur}
      value={valueState}
      inputClassName={s.alpha_input}
    />
  );
}
