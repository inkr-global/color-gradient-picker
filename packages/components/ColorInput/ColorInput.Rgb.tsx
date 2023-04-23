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

  const _onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let _value = parseInt(e.currentTarget.value);
    if (_value < RGB_VALUE_RANGE.MIN) _value = RGB_VALUE_RANGE.MIN;
    if (_value > RGB_VALUE_RANGE.MAX) _value = RGB_VALUE_RANGE.MAX;
    if (Number.isNaN(_value)) _value = RGB_VALUE_RANGE.MIN;
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

  return (
    <ColorInputBase
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

// ---------------------------------------------------------------------------

function InputTextInfo(props: { children: ReactNode }) {
  const { children } = props;

  return <div className={s.input_text}>{children}</div>;
}
