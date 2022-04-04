import React, { useEffect, useState } from "react";

import { Alpha as AlphaValue } from "../../colorTypes";
import { getAlphaDisplayValueFromAlpha } from "../ColorPicker/components/AlphaSlider/utils";
import { ALPHA_DISPLAY_VALUE, KEYS } from "./constants";
import { Input } from "./Input";
import s from "./Input.Alpha.module.css";
import { InputProps } from "./types";

function InputAlphaInfo() {
  return <div className={s.alpha_info} />;
}

const ALPHA_SYMBOL = "%";

const getAlphaString = (alpha: AlphaValue) => `${alpha}${ALPHA_SYMBOL}`;

export function Alpha(
  props: Omit<InputProps, "onChange" | "info" | "value"> & {
    onChange: (value: number) => void;
    value: number;
  },
) {
  const { value, onChange, onInputBlur, ...rest } = props;

  const [displayAlpha, setDisplayAlpha] = useState<string>(
    getAlphaDisplayValueFromAlpha(value),
  );

  // -----------------------------------------------------------------------
  useEffect(() => {
    setDisplayAlpha(getAlphaDisplayValueFromAlpha(value));
  }, [value]);

  // -----------------------------------------------------------------------
  const _onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let _value = parseInt(e.currentTarget.value.replace(ALPHA_SYMBOL, ""));
    _value = Math.round(_value);
    if (_value < ALPHA_DISPLAY_VALUE.MIN) _value = ALPHA_DISPLAY_VALUE.MIN;
    if (_value > ALPHA_DISPLAY_VALUE.MAX) _value = ALPHA_DISPLAY_VALUE.MAX;
    if (isNaN(_value)) _value = ALPHA_DISPLAY_VALUE.MIN;

    setDisplayAlpha(getAlphaString(_value));
  };

  const _onOutsideChange = () => {
    // remove % if the valueState has it
    const _alphaDisplayNumber =
      parseInt(displayAlpha.replace(ALPHA_SYMBOL, "")) / 100;

    onChange(_alphaDisplayNumber);
    setDisplayAlpha(getAlphaDisplayValueFromAlpha(_alphaDisplayNumber));
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
    <Input
      {...rest}
      info={<InputAlphaInfo />}
      onChange={_onInternalChange}
      onKeyDown={_onKeyDown}
      onInputBlur={_onBlur}
      value={displayAlpha}
      inputClassName={s.alpha_input}
    />
  );
}
