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
  const handleInternalChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    let _value = parseInt(e.currentTarget.value.replace(ALPHA_SYMBOL, ""));
    _value = Math.round(_value);
    if (_value < ALPHA_DISPLAY_VALUE_RANGE.MIN)
      _value = ALPHA_DISPLAY_VALUE_RANGE.MIN;
    if (_value > ALPHA_DISPLAY_VALUE_RANGE.MAX)
      _value = ALPHA_DISPLAY_VALUE_RANGE.MAX;
    if (Number.isNaN(_value)) _value = ALPHA_DISPLAY_VALUE_RANGE.MIN;

    setDisplayAlpha(_value + "");
  };

  const handleOutsideChange = () => {
    // remove % if the valueState has it
    const _alphaDisplayNumber =
      parseInt(displayAlpha.replace(ALPHA_SYMBOL, "")) / 100;

    onChange(_alphaDisplayNumber);
    setDisplayAlpha(
      getAlphaDisplayValueFromAlpha(_alphaDisplayNumber, ALPHA_SYMBOL),
    );
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    if (e.key === KEYS.ENTER) handleOutsideChange();
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    handleOutsideChange();
    if (typeof onInputBlur === "function") onInputBlur(e);
  };

  const handleInputFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    setDisplayAlpha(displayAlpha.replace(ALPHA_SYMBOL, ""));
  };

  // -----------------------------------------------------------------------
  return (
    <ColorInputBase
      {...rest}
      info={<InputAlphaInfo />}
      onChange={handleInternalChange}
      onKeyDown={handleKeyDown}
      onInputBlur={handleBlur}
      onInputFocus={handleInputFocus}
      value={displayAlpha}
      inputClassName={s.alpha_input}
    />
  );
}

// ---------------------------------------------------------------------------

function InputAlphaInfo() {
  return <div className={s.alpha_info} />;
}
