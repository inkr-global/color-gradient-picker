import React, { useEffect, useState } from "react";

import { ENTER_KEY, Input } from "./Input";
import s from "./Input.Alpha.module.css";
import { InputProps } from "./types";

function InputAlphaInfo() {
  return <div className={s.alpha_info} />;
}

const getAlphaString = (alpha: number) => `${alpha}%`;

export function Alpha(
  props: Omit<InputProps, "onChange" | "info" | "value"> & {
    onChange: (value: number) => void;
    value: number;
  },
) {
  const { value, onChange, onInputBlur, ...rest } = props;

  const [valueState, setValueState] = useState<string | number | undefined>(
    getAlphaString(value),
  );

  // -----------------------------------------------------------------------
  useEffect(() => {
    setValueState(getAlphaString(value));
  }, [value]);

  // -----------------------------------------------------------------------
  const _onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let _value = parseInt(e.currentTarget.value.replace("%", ""));
    _value = Math.round(_value);
    if (_value < 0) _value = 0;
    if (_value > 100) _value = 100;
    if (isNaN(_value)) _value = 0;

    setValueState(_value);
  };

  const _onOutsideChange = () => {
    // remove % if the valueState has it
    const _valueState = parseInt(
      (valueState?.toString() || "100")?.replace("%", ""),
    );
    onChange(_valueState);
    setValueState(getAlphaString(_valueState));
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
      info={<InputAlphaInfo />}
      onChange={_onInternalChange}
      onKeyDown={_onKeyDown}
      onInputBlur={_onBlur}
      value={valueState}
      inputClassName={s.alpha_input}
    />
  );
}
