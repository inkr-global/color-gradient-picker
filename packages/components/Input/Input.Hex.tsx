import React, { useEffect, useState } from "react";

import sanitizeHex from "../../color-utils/sanitizeHex";
import { KEYS } from "./constants";
import { BaseInput } from "./Input";
import s from "./Input.Hex.module.css";
import { BaseInputProps } from "./types";


function ColorPreview(props: { value: string }) {
  const { value } = props;

  return (
    <div
      style={{
        background: value,
      }}
      className={s.color_preview}
    />
  );
}

// ------------------------------------------------------------------------------------------
export function InputHex(
  props: Omit<BaseInputProps, "onChange" | "info" | "value"> & {
    onChange: (value: string) => void;
    value: string;
  },
) {
  const { value, onChange, onInputBlur, ...rest } = props;

  const [valueState, setValueState] = useState<string>(value);

  // -----------------------------------------------------------------------
  useEffect(() => {
    setValueState(value);
  }, [value]);

  const _onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const _value = e.currentTarget.value;

    setValueState(_value);
  };

  const _onOutsideChange = () => {
    const _valueState = sanitizeHex(valueState);
    onChange(_valueState);
    setValueState(_valueState);
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
    <BaseInput
      {...rest}
      onChange={_onInternalChange}
      onKeyDown={_onKeyDown}
      onInputBlur={_onBlur}
      value={valueState.toUpperCase()}
      info={<ColorPreview value={value as string} />}
    />
  );
}
