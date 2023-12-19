import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

import { ColorInputCoreProps } from "../../types/colorInput";
import s from "./styles/Input.Base.module.css";


export function ColorInputBase(props: ColorInputCoreProps) {
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
    showEyeDropperOnHover,
    onEyeDropperClick,
  } = props;

  const { style: inputStyle, ...restInputProps } = inputProps || {};

  // -----------------------------------------------------------------------
  const [isFocus, setFocus] = useState<boolean>();
  const [isHover, setHover] = useState<boolean>();

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
    <div
      className={clsx(s.container, "input-base", className)}
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
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

        {(showEyeDropperOnHover && isHover) && (
          <EyeDropper onClick={onEyeDropperClick} />
        )}

        {extra}

      </div>
    </div>
  );
}


function EyeDropper(props: { onClick?: React.MouseEventHandler<HTMLDivElement> }) {

  const { onClick } = props;

  return (
    <div
      style={{
        paddingRight: 6,
        marginLeft: -18,
        cursor: "pointer",
      }}
      role="presentation"
      onClick={onClick}
    >
      <svg
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.61333 11.6667L1.33333 10.3867L6.70667 5.00002L8 6.29335L2.61333 11.6667ZM11.8067 2.75335L10.2467 1.19335C10 0.933352 9.56667 0.933352 9.30667 1.19335L7.22667 3.27335L5.94 2.00002L5 2.94002L5.94667 3.88669L0 9.83335V13H3.16667L9.11333 7.05335L10.06 8.00002L11 7.06002L9.72 5.78002L11.8 3.70002C12.0667 3.43335 12.0667 3.00002 11.8067 2.75335Z"
          fill="black"
          fillOpacity="0.8"
        />
      </svg>
    </div>
  );
}
