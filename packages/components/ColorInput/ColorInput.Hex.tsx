import React, { CSSProperties, memo, useCallback, useEffect, useMemo, useState } from "react";

import { KEYS } from "../../constants/colorInput";
import { ColorInputCoreProps } from "../../types/colorInput";
import { sanitizeHex } from "../../utils/color/sanitizeHex";
import { ColorInputBase } from "./ColorInput.Core";
import s from "./styles/Input.Hex.module.css";


interface ColorInputHexProps extends Omit<ColorInputCoreProps, "onChange" | "info" | "value"> {
  onChange: (value: string) => void;
  value: string;
  onColorPreviewClick?: React.MouseEventHandler<HTMLDivElement>;
  shouldUpdateColorValue?: boolean;
  showEyeDropperOnFocus?: boolean;
  onEyeDropperClick?: () => void;
}


export const ColorInputHex = memo(function ColorInputHex({
  value,
  onChange,
  onInputBlur,
  onColorPreviewClick,
  shouldUpdateColorValue = true,
  showEyeDropperOnHover: showEyeDropperOnFocus = false,
  onEyeDropperClick,
  ...rest
}: ColorInputHexProps) {


  // -----------------------------------------------------------------------

  const [valueState, setValueState] = useState<string>(value);

  useEffect(() => {
    setValueState(value);
  }, [value]);


  // -----------------------------------------------------------------------

  const handleInternalChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    if (!shouldUpdateColorValue) return;
    const _value = e.currentTarget.value;
    setValueState(_value);
  }, [shouldUpdateColorValue]);

  const handleOutsideChange = useCallback(() => {
    if (!shouldUpdateColorValue) return;
    const _valueState = sanitizeHex(valueState);
    onChange(_valueState);
    setValueState(_valueState);
  }, [onChange, shouldUpdateColorValue, valueState]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    e.stopPropagation();
    if (e.key === KEYS.ENTER) handleOutsideChange();
  }, [handleOutsideChange]);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback((e) => {
    handleOutsideChange();
    if (typeof onInputBlur === "function") onInputBlur(e);
  }, [handleOutsideChange, onInputBlur]);


  // -----------------------------------------------------------------------

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
      showEyeDropperOnHover={showEyeDropperOnFocus}
      onEyeDropperClick={onEyeDropperClick}
    />
  );

});

// ---------------------------------------------------------------------------


const ColorPreview = memo(function ColorPreview({
  value,
  onClick,
}: {
  value: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {

  return (
    <div
      style={useMemo((): CSSProperties => ({
        background: value,
      }), [value])}
      className={s.color_preview}
      onClick={onClick}
      role="presentation"
    />
  );

});
