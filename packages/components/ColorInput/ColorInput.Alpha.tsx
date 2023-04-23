import React, { useEffect, useState } from "react";

import {
  ALPHA_DISPLAY_VALUE_RANGE,
  ALPHA_SYMBOL,
  KEYS,
} from "../../constants/colorInput";
import { ColorInputCoreProps } from "../../types/colorInput";
import { getAlphaDisplayValueFromAlpha } from "../../utils/common";
import { ColorInputBase } from "./ColorInput.Core";
import s from "./styles/Input.Alpha.module.css";

export function ColorInputAlpha(
  props: Omit<ColorInputCoreProps, "onChange" | "info" | "value"> & {
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
    if (_value < ALPHA_DISPLAY_VALUE_RANGE.MIN) _value = ALPHA_DISPLAY_VALUE_RANGE.MIN;
    if (_value > ALPHA_DISPLAY_VALUE_RANGE.MAX) _value = ALPHA_DISPLAY_VALUE_RANGE.MAX;
    if (Number.isNaN(_value)) _value = ALPHA_DISPLAY_VALUE_RANGE.MIN;

    setDisplayAlpha(_value + "");
  };

  const _onOutsideChange = () => {
    // remove % if the valueState has it
    const _alphaDisplayNumber =
      parseInt(displayAlpha.replace(ALPHA_SYMBOL, "")) / 100;

    onChange(_alphaDisplayNumber);
    setDisplayAlpha(
      getAlphaDisplayValueFromAlpha(_alphaDisplayNumber, ALPHA_SYMBOL),
    );
  };

  const _onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    if (e.key === KEYS.ENTER) _onOutsideChange();
  };

  const _onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    _onOutsideChange();
    if (typeof onInputBlur === "function") onInputBlur(e);
  };

  const _onInputFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    setDisplayAlpha(displayAlpha.replace(ALPHA_SYMBOL, ""));
  };

  // -----------------------------------------------------------------------
  return (
    <ColorInputBase
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

// ---------------------------------------------------------------------------

function InputAlphaInfo() {
  return <div className={s.alpha_info} />;
}
