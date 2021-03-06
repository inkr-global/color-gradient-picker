import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import s from "./styles/Input.Base.module.css";
import { BaseInputProps } from "./types";


function InputBase(props: BaseInputProps) {
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
    theme,
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
          theme === "light" ? s.wrapper_light : s.wrapper_dark,
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


export { InputBase };
