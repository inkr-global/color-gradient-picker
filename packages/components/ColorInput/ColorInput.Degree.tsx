import React, { useEffect, useState } from "react";

import {
  DEGREE_SYMBOL,
  DEGREE_VALUE_RANGE,
  KEYS,
} from "../../constants/colorInput";
import { ColorGradientPickerTheme } from "../../types/colorGradientPicker";
import { ColorInputCoreProps } from "../../types/colorInput";
import { ColorInputBase } from "./ColorInput.Core";


const getDegreeString = (degree: number) => `${degree}${DEGREE_SYMBOL}`;

export function ColorInputDegree(
  props: Omit<ColorInputCoreProps, "onChange" | "info" | "value"> & {
    onChange: (value: number) => void;
    value: number;
    theme?: ColorGradientPickerTheme;
  },
) {
  const { value, onChange, onInputBlur, theme, ...rest } = props;

  const [valueState, setValueState] = useState<string>(getDegreeString(value));

  // ------------------------------------------------------------------------------------------
  useEffect(() => {
    setValueState(getDegreeString(value));
  }, [value]);

  const handleInternalChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let _value = parseInt(e.currentTarget.value.replace(DEGREE_SYMBOL, ""));
    _value = Math.round(_value);
    if (_value < DEGREE_VALUE_RANGE.MIN) _value = DEGREE_VALUE_RANGE.MIN;
    if (_value > DEGREE_VALUE_RANGE.MAX) _value = DEGREE_VALUE_RANGE.MAX;
    if (Number.isNaN(_value)) _value = DEGREE_VALUE_RANGE.MIN;

    setValueState(`${_value}`);
  };

  const handleOutsideChange = () => {
    const _valueState = parseInt(
      valueState?.toString()?.replace(DEGREE_SYMBOL, ""),
    );
    onChange(_valueState);
    setValueState(getDegreeString(_valueState));
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    e.stopPropagation();
    if (e.key === KEYS.ENTER) handleOutsideChange();
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    handleOutsideChange();
    if (typeof onInputBlur === "function") onInputBlur(e);
  };

  const handleInputFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    setValueState(valueState.replace(DEGREE_SYMBOL, ""));
  };

  // -----------------------------------------------------------------------
  return (
    <ColorInputBase
      {...rest}
      onChange={handleInternalChange}
      onKeyDown={handleKeyDown}
      value={valueState}
      onInputBlur={handleBlur}
      onInputFocus={handleInputFocus}
      info={<DegreeInfo theme={theme} />}
      inputWidth={35}
    />
  );
}

// ---------------------------------------------------------------------------

function DegreeInfo({ theme }: { theme?: ColorGradientPickerTheme }) {
  const titleColor = theme === "light" ? "#bbb" : "white";
  const fillOpacity = theme === "light" ? "0.8" : "0.3";

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: "relative",
        top: 2,
      }}
    >
      <path
        d="M6.99062 0.937567C3.53906 0.942254 0.75 3.73444 0.75 7.186C0.75 9.186 1.69062 10.9673 3.15312 12.111L2.56719 12.861C2.50313 12.9438 2.5625 13.0641 2.66563 13.0626L5.275 13.0501C5.35625 13.0501 5.41562 12.9735 5.39531 12.8954L4.77812 10.3594C4.77255 10.3366 4.76064 10.3158 4.74376 10.2994C4.72688 10.283 4.70571 10.2717 4.6827 10.2668C4.65968 10.2619 4.63575 10.2636 4.61366 10.2717C4.59157 10.2798 4.57221 10.294 4.55781 10.3126L3.92188 11.1266C3.7625 11.0016 3.60938 10.8657 3.46406 10.7204C3.00722 10.2651 2.64318 9.72543 2.39219 9.13132C2.13125 8.51569 2 7.861 2 7.186C2 6.511 2.13125 5.85632 2.39219 5.24069C2.64375 4.64538 3.00469 4.111 3.46406 3.65163C3.92344 3.19225 4.45781 2.83132 5.05312 2.57975C5.67031 2.31882 6.325 2.18757 7 2.18757C7.675 2.18757 8.32969 2.31882 8.94531 2.57975C9.54062 2.83132 10.075 3.19225 10.5344 3.65163C10.9938 4.111 11.3547 4.64538 11.6062 5.24069C11.8672 5.85632 11.9984 6.511 11.9984 7.186C11.9984 7.861 11.8672 8.51569 11.6062 9.13132C11.3553 9.72543 10.9912 10.2651 10.5344 10.7204C10.4172 10.8376 10.2953 10.9469 10.1687 11.0516C10.1434 11.0722 10.1272 11.102 10.1237 11.1345C10.1202 11.167 10.1296 11.1995 10.15 11.2251L10.7656 12.0141C10.8094 12.0688 10.8891 12.0782 10.9438 12.0344C12.3516 10.8876 13.25 9.14225 13.25 7.186C13.25 3.73132 10.4469 0.932879 6.99062 0.937567Z"
        fill={titleColor}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
}
