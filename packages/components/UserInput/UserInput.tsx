import {
  ALPHA_VALUE_RANGE,
  DEFAULT_COLOR_TYPE,
  DEFAULT_HEX_DARK,
  DEFAULT_HEX_LIGHT,
} from "../../constants/colorInput";
import { DEFAULT_GRADIENT } from "../../constants/gradientPicker";
import { UserInputProps } from "../../types/userInput";
import { ColorInputAlpha } from "../ColorInput/ColorInput.Alpha";
import { ColorInputGradient } from "../ColorInput/ColorInput.Gradient";
import { ColorInputHex } from "../ColorInput/ColorInput.Hex";
import s from "./UserInput.module.css";

export const UserInput = (props: UserInputProps) => {
  const {
    color,
    onSolidColorChange,
    onAlphaChange,
    hasAlphaInput,
    inputWidth = 80,
    theme,
    ...rest
  } = props;

  const {
    type = DEFAULT_COLOR_TYPE,
    solid = theme === "dark" ? DEFAULT_HEX_DARK : DEFAULT_HEX_LIGHT,
    alpha = ALPHA_VALUE_RANGE.MAX,
    gradient = DEFAULT_GRADIENT,
  } = color || {};

  const alphaInput = hasAlphaInput ? (
    <>
      <div className={s.input_vertical_divider} />
      <ColorInputAlpha
        {...rest}
        isExtraComponent
        value={alpha}
        onChange={onAlphaChange}
        inputWidth={45}
      />
    </>
  ) : undefined;

  return (
    <>
      {type === "solid" && (
        <ColorInputHex
          {...rest}
          inputWidth={inputWidth}
          value={color ? solid : ""}
          onChange={onSolidColorChange}
          extraInput={alphaInput}
        />
      )}

      {type === "linear-gradient" && (
        <ColorInputGradient
          {...rest}
          inputWidth={inputWidth}
          value={gradient}
        />
      )}
    </>
  );
};
