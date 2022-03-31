import clsx from "clsx";
import React, { HTMLProps, useEffect, useRef, useState } from "react";

import sanitizeHex from "../../utils/sanitizeHex";
import s from "./Input.module.css";
import {
  InputColorPreviewProps,
  InputProps,
  InputTextInfoProps,
} from "./types";

const ENTER_KEY = "Enter";

function InputColorPreview(props: InputColorPreviewProps) {
  const { value, className } = props;

  return (
    <div
      style={{ background: value }}
      className={clsx(s.color_preview, className)}
    />
  );
}

function InputTextInfo(props: InputTextInfoProps) {
  const { children, className } = props;

  return <div className={clsx(s.text_info, className)}>{children}</div>;
}

function InputAlphaInfo() {
  return <div className={s.alpha_info} />;
}

function Input(props: InputProps) {
  // ------------------------------------------------------------------------------------------
  const {
    className,
    info,
    label,
    style,
    inputWrapperClassName,
    inputClassName,
    inputProps,
    placeholder,
    onInputFocus,
    onInputBlur,
    onChange,
    onKeyDown,
    value,
    inputWidth,
    extraInput: extra,
    isExtraComponent,
  } = props;

  const { style: inputStyle, ...restInputProps } = inputProps || {};

  // -----------------------------------------------------------------------
  const [isFocus, setFocus] = useState<boolean>();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof document === "undefined") return () => undefined;

    const handler = (e: Event) => {
      if (containerRef.current?.contains(e.target as HTMLElement)) {
        setFocus(true);
      } else {
        setFocus(false);
      }
    };

    document.addEventListener("click", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  // -----------------------------------------------------------------------

  return (
    <div className={clsx(s.container, className)} style={style}>
      {label && <div className={clsx(s.label)}>{label}</div>}

      <div
        className={clsx(
          s.wrapper,
          isFocus && s.isFocus,
          isExtraComponent && s.extra_component,
          inputWrapperClassName,
        )}
        ref={containerRef}
      >
        {info && !isExtraComponent && (
          <div className={clsx(s.info)}>{info}</div>
        )}

        <input
          {...restInputProps}
          style={{
            ...inputStyle,
            width: inputWidth,
          }}
          onFocus={(e) => {
            if (typeof onInputFocus === "function") onInputFocus(e);
            setTimeout(() => {
              e.target.select();
            }, 100);
          }}
          onBlur={onInputBlur}
          placeholder={placeholder}
          className={clsx(s.input, inputClassName)}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />

        {extra}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------------------------------
function Rgb(
  props: Omit<InputProps, "onChange" | "value"> & {
    onChange: (value: number) => void;
    value: number;
  },
) {
  const { inputProps, info, onChange, value, onInputBlur, ...rest } = props;

  const [valueState, setValueState] = useState<number>(value);

  const customInputProps: HTMLProps<HTMLInputElement> = {
    ...inputProps,
    type: "number",
    min: 0,
    max: 255,
  };

  // -----------------------------------------------------------------------
  useEffect(() => {
    setValueState(value);
  }, [value]);

  // -----------------------------------------------------------------------

  const _onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let _value = parseInt(e.currentTarget.value);
    if (_value < 0) _value = 0;
    if (_value > 255) _value = 255;
    if (isNaN(_value)) _value = 0;
    setValueState(_value);
  };

  const _onOutsideChange = () => {
    onChange(valueState as number);
    setValueState(valueState);
  };

  const _onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === ENTER_KEY) _onOutsideChange();
  };

  const _onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    _onOutsideChange();
    if (typeof onInputBlur === "function") onInputBlur(e);
  };

  // -----------------------------------------------------------------------

  return (
    <Input
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

// ------------------------------------------------------------------------------------------
const getAlphaString = (alpha: number) => `${alpha}%`;

function Alpha(
  props: Omit<InputProps, "onChange" | "info" | "value"> & {
    onChange: (value: number) => void;
    value: number;
  },
) {
  const { value, onChange, onInputBlur, ...rest } = props;

  const [valueState, setValueState] = useState<string | number | undefined>(
    getAlphaString(value),
  );

  // -----------------------------------------------------------------------
  useEffect(() => {
    setValueState(getAlphaString(value));
  }, [value]);

  // -----------------------------------------------------------------------
  const _onInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let _value = parseInt(e.currentTarget.value.replace("%", ""));
    _value = Math.round(_value);
    if (_value < 0) _value = 0;
    if (_value > 100) _value = 100;
    if (isNaN(_value)) _value = 0;

    setValueState(_value);
  };

  const _onOutsideChange = () => {
    // remove % if the valueState has it
    const _valueState = parseInt(
      (valueState?.toString() || "100")?.replace("%", ""),
    );
    onChange(_valueState);
    setValueState(getAlphaString(_valueState));
  };

  const _onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === ENTER_KEY) _onOutsideChange();
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
      value={valueState}
      inputClassName={s.alpha_input}
    />
  );
}

// ------------------------------------------------------------------------------------------
function ColorHex(
  props: Omit<InputProps, "onChange" | "info" | "value"> & {
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
    if (e.key === ENTER_KEY) _onOutsideChange();
  };

  const _onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    _onOutsideChange();
    if (typeof onInputBlur === "function") onInputBlur(e);
  };

  // -----------------------------------------------------------------------

  return (
    <Input
      {...rest}
      onChange={_onInternalChange}
      onKeyDown={_onKeyDown}
      onInputBlur={_onBlur}
      value={valueState.toUpperCase()}
      info={<InputColorPreview value={value as string} />}
    />
  );
}

// ------------------------------------------------------------------------------------------
Input.Alpha = Alpha;
Input.Rgb = Rgb;
Input.ColorHex = ColorHex;

export default Input;
