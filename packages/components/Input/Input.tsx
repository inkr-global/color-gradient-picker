import clsx from "clsx";
import { useState } from "react";

import {
  InputColorPreviewProps,
  InputProps,
  InputTextInfoProps,
} from "../../types";
import { applyPrefixToName } from "../../utils";
import s from "./Input.module.css";

function InputColorPreview(props: InputColorPreviewProps) {
  const { value, className, classNamePrefix } = props;

  const getPrefixClassName = applyPrefixToName(classNamePrefix);

  return (
    <div
      style={{ background: value }}
      className={clsx(
        s.color_preview,
        className,
        getPrefixClassName("input-color-preview"),
      )}
    />
  );
}

function InputTextInfo(props: InputTextInfoProps) {
  const { children, className, classNamePrefix } = props;

  const getPrefixClassName = applyPrefixToName(classNamePrefix);

  return (
    <div
      className={clsx(
        s.text_info,
        className,
        getPrefixClassName("input-text-info"),
      )}
    >
      {children}
    </div>
  );
}

function Input(props: InputProps) {
  // ------------------------------------------------------------------------------------------
  const {
    classNamePrefix,
    className,
    info,
    label,
    style,
    hasExtraInput,
    inputWrapperClassName,
    inputProps,
    placeholder,
    extraPlaceholder,
    extraInputProps,
    onInputFocus,
    onInputBlur,
    onExtraInputFocus,
    onExtraInputBlur,
  } = props;

  // ------------------------------------------------------------------------------------------
  const [isFocus, setFocus] = useState<boolean>();

  const getPrefixClassName = applyPrefixToName(classNamePrefix);

  return (
    <div
      className={clsx(
        s.container,
        className,
        getPrefixClassName("input-container"),
      )}
      style={style}
    >
      {label && (
        <div className={clsx(s.label, getPrefixClassName("input-label"))}>
          {label}
        </div>
      )}

      <div
        className={clsx(
          s.wrapper,
          isFocus && s.isFocus,
          inputWrapperClassName,
          getPrefixClassName("input-wrapper"),
        )}
      >
        <div className={clsx(s.info, getPrefixClassName("input-icon"))}>
          {info}
        </div>

        <input
          {...inputProps}
          onFocus={(e) => {
            if (typeof onInputFocus === "function") onInputFocus(e);
            setFocus(true);
          }}
          onBlur={(e) => {
            if (typeof onInputBlur === "function") onInputBlur(e);
            setFocus(false);
          }}
          placeholder={placeholder}
          className={clsx(s.input, getPrefixClassName("input"))}
        />

        {hasExtraInput && (
          <>
            <div className={s.extra_input_divider} />

            <input
              {...extraInputProps}
              onFocus={(e) => {
                if (typeof onExtraInputFocus === "function")
                  onExtraInputFocus(e);
                setFocus(true);
              }}
              onBlur={(e) => {
                if (typeof onExtraInputBlur === "function") onExtraInputBlur(e);
                setFocus(false);
              }}
              placeholder={extraPlaceholder}
              className={clsx(s.input_extra, getPrefixClassName("input-extra"))}
            />
          </>
        )}
      </div>
    </div>
  );
}

Input.ColorPreview = InputColorPreview;
Input.InputTextInfo = InputTextInfo;

export default Input;
