import React, { useEffect, useState } from "react";

import { getAlphaDisplayValueFromAlpha } from "../../utils/common";
import { ALPHA_DISPLAY_VALUE, ALPHA_SYMBOL, KEYS } from "./constants";
import { InputBase } from "./Input.Base";
import s from "./styles/Input.Alpha.module.css";
import { BaseInputProps } from "./types";


function InputAlphaInfo() {
  return <div className={s.alpha_info} />;
}


export function InputAlpha(
  props: Omit<BaseInputProps, "onChange" | "info" | "value"> & {
    onChange: (value: number) => void;
    value: number;
  },
) {
  const { value, onChange, onInputBlur, ...rest } = props;

  const [displayAlpha, setDisplayAlpha] = useState<string>(
    getAlphaDisplayValueFromAlpha(value, ALPHA_SYMBOL),
  );

  // -----------------------------------------------------------------------
  useEffect(() => {
    setDisplayAlpha(getAlphaDisplayValueFromAlpha(value, ALPHA_SYMBOL));
  }, [value]);

  // -----------------------------------------------------------------------
  const _onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let _value = parseInt(e.currentTarget.value.replace(ALPHA_SYMBOL, ""));
    _value = Math.round(_value);
    if (_value < ALPHA_DISPLAY_VALUE.MIN) _value = ALPHA_DISPLAY_VALUE.MIN;
    if (_value > ALPHA_DISPLAY_VALUE.MAX) _value = ALPHA_DISPLAY_VALUE.MAX;
    if (Number.isNaN(_value)) _value = ALPHA_DISPLAY_VALUE.MIN;

    setDisplayAlpha(_value + "");
  };

  const _onOutsideChange = () => {
    // remove % if the valueState has it
    const _alphaDisplayNumber =
      parseInt(displayAlpha.replace(ALPHA_SYMBOL, "")) / 100;

    onChange(_alphaDisplayNumber);
    setDisplayAlpha(getAlphaDisplayValueFromAlpha(_alphaDisplayNumber, ALPHA_SYMBOL));
  };

  const _onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    if (e.key === KEYS.ENTER) _onOutsideChange();
  };

  const _onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    _onOutsideChange();
    if (typeof onInputBlur === "function") onInputBlur(e);
  };

  const _onInputFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setDisplayAlpha(displayAlpha.replace(ALPHA_SYMBOL, ""));
  };

  // -----------------------------------------------------------------------
  return (
    <InputBase
      {...rest}
      info={<InputAlphaInfo />}
      onChange={_onInternalChange}
      onKeyDown={_onKeyDown}
      onInputBlur={_onBlur}
      onInputFocus={_onInputFocus}
      value={displayAlpha}
      inputClassName={s.alpha_input}
    />
  );
}
