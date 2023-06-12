import React, { HTMLProps, ReactNode, useEffect, useState } from "react";

import { KEYS, RGB_VALUE_RANGE } from "../../constants/colorInput";
import { ColorInputCoreProps } from "../../types/colorInput";
import { ColorInputBase } from "./ColorInput.Core";
import s from "./styles/Input.Rgb.module.css";

export function ColorInputRgb(
  props: Omit<ColorInputCoreProps, "onChange" | "value"> & {
    onChange: (value: number) => void;
    value: number;
  },
) {
  const { inputProps, info, onChange, value, onInputBlur, ...rest } = props;

  const [valueState, setValueState] = useState<number>(value);

  const customInputProps: HTMLProps<HTMLInputElement> = {
    ...inputProps,
    type: "number",
    min: RGB_VALUE_RANGE.MIN,
    max: RGB_VALUE_RANGE.MAX,
  };

  // ---------------------------------------------------------------------------

  useEffect(() => {
    setValueState(value);
  }, [value]);

  // ---------------------------------------------------------------------------

  const handleInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let _value = parseInt(e.currentTarget.value);
    if (_value < RGB_VALUE_RANGE.MIN) _value = RGB_VALUE_RANGE.MIN;
    if (_value > RGB_VALUE_RANGE.MAX) _value = RGB_VALUE_RANGE.MAX;
    if (Number.isNaN(_value)) _value = RGB_VALUE_RANGE.MIN;
    setValueState(_value);
  };

  const handleOutsideChange = () => {
    onChange(valueState as number);
    setValueState(valueState);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    if (e.key === KEYS.ENTER) handleOutsideChange();
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    handleOutsideChange();
    if (typeof onInputBlur === "function") onInputBlur(e);
  };

  return (
    <ColorInputBase
      {...rest}
      onChange={handleInternalChange}
      onKeyDown={handleKeyDown}
      value={valueState}
      onInputBlur={handleBlur}
      info={<InputTextInfo>{info}</InputTextInfo>}
      inputProps={customInputProps}
    />
  );
}

// ---------------------------------------------------------------------------

function InputTextInfo(props: { children: ReactNode }) {
  const { children } = props;

  return <div className={s.input_text}>{children}</div>;
}
