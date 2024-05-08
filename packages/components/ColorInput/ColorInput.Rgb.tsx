import React, { HTMLProps, memo, ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { KEYS, RGB_VALUE_RANGE } from "../../constants/colorInput";
import { ColorInputCoreProps } from "../../types/colorInput";
import { ColorInputBase } from "./ColorInput.Core";
import s from "./styles/Input.Rgb.module.css";


export interface ColorInputRgbProps extends Omit<ColorInputCoreProps, "onChange" | "value"> {
  onChange: (value: number) => void;
  value: number;
}


export const ColorInputRgb = memo(function ColorInputRgb({
  inputProps,
  info,
  onChange,
  value,
  onInputBlur,
  ...rest
}: ColorInputRgbProps) {

  const customInputProps: HTMLProps<HTMLInputElement> = useMemo(() => ({
    ...inputProps,
    type: "number",
    min: RGB_VALUE_RANGE.MIN,
    max: RGB_VALUE_RANGE.MAX,
  }), [inputProps]);


  // ---------------------------------------------------------------------------

  const [valueState, setValueState] = useState<number>(value);

  useEffect(() => {
    setValueState(value);
  }, [value]);


  // ---------------------------------------------------------------------------

  const handleInternalChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    let _value = parseInt(e.currentTarget.value);
    if (_value < RGB_VALUE_RANGE.MIN) _value = RGB_VALUE_RANGE.MIN;
    if (_value > RGB_VALUE_RANGE.MAX) _value = RGB_VALUE_RANGE.MAX;
    if (Number.isNaN(_value)) _value = RGB_VALUE_RANGE.MIN;
    setValueState(_value);
  }, []);

  const handleOutsideChange = useCallback(() => {
    onChange(valueState as number);
    setValueState(valueState);
  }, [onChange, valueState]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
    e.stopPropagation();
    if (e.key === KEYS.ENTER) handleOutsideChange();
  }, [handleOutsideChange]);

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = useCallback((e) => {
    handleOutsideChange();
    if (typeof onInputBlur === "function") onInputBlur(e);
  }, [handleOutsideChange, onInputBlur]);


  // ---------------------------------------------------------------------------

  return (
    <ColorInputBase
      {...rest}
      onChange={handleInternalChange}
      onKeyDown={handleKeyDown}
      value={valueState}
      onInputBlur={handleBlur}
      info={(
        <InputTextInfo>
          {info}
        </InputTextInfo>
      )}
      inputProps={customInputProps}
    />
  );

});


// ---------------------------------------------------------------------------

const InputTextInfo = memo(function InputTextInfo({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={s.input_text}>
      {children}
    </div>
  );
});
