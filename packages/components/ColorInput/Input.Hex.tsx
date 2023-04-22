import React, { useEffect, useState } from "react";

import sanitizeHex from "../../utils/color/sanitizeHex";
import { InputBase } from "./Input.Base";
import { KEYS } from "./misc/constants";
import { BaseInputProps } from "./misc/types";
import s from "./styles/Input.Hex.module.css";

export function InputHex(
  props: Omit<BaseInputProps, "onChange" | "info" | "value"> & {
    onChange: (value: string) => void;
    value: string;
    onColorPreviewClick?: React.MouseEventHandler<HTMLDivElement>;
    theme?: "light" | "dark";
  },
) {
  const { value, onChange, onInputBlur, onColorPreviewClick, theme, ...rest } = props;

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

  return (
    <InputBase
      {...rest}
      onChange={_onInternalChange}
      onKeyDown={_onKeyDown}
      onInputBlur={_onBlur}
      value={valueState.toUpperCase()}
      info={
        <ColorPreview onClick={onColorPreviewClick} value={value as string} />
      }
      theme={theme}
    />
  );
}

// ---------------------------------------------------------------------------

function ColorPreview(props: {
  value: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
  const { value, onClick } = props;

  return (
    <div
      style={{
        background: value,
      }}
      className={s.color_preview}
      onClick={onClick}
    />
  );
}
