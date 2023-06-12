import React, { useEffect, useState } from "react";

import { KEYS } from "../../constants/colorInput";
import { ColorInputCoreProps } from "../../types/colorInput";
import sanitizeHex from "../../utils/color/sanitizeHex";
import { ColorInputBase } from "./ColorInput.Core";
import s from "./styles/Input.Hex.module.css";


export function ColorInputHex(
  props: Omit<ColorInputCoreProps, "onChange" | "info" | "value"> & {
    onChange: (value: string) => void;
    value: string;
    onColorPreviewClick?: React.MouseEventHandler<HTMLDivElement>;
    shouldUpdateColorValue?: boolean;
  },
) {
  const { value, onChange, onInputBlur, onColorPreviewClick, shouldUpdateColorValue = true, ...rest } = props;

  const [valueState, setValueState] = useState<string>(value);

  // -----------------------------------------------------------------------
  useEffect(() => {
    setValueState(value);
  }, [value]);

  const handleInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!shouldUpdateColorValue) return;
    const _value = e.currentTarget.value;
    setValueState(_value);
  };

  const handleOutsideChange = () => {
    if (!shouldUpdateColorValue) return;
    const _valueState = sanitizeHex(valueState);
    onChange(_valueState);
    setValueState(_valueState);
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
      onInputBlur={handleBlur}
      value={valueState.toUpperCase()}
      info={(
        <ColorPreview
          onClick={onColorPreviewClick}
          value={value as string}
        />
      )}
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
      role="presentation"
    />
  );
}
