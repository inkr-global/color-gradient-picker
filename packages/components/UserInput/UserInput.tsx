import { ALPHA_VALUE_RANGE, DEFAULT_HEX } from "../../constants/colorInput";
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
    ...rest
  } = props;

  const {
    type,
    solid = DEFAULT_HEX,
    alpha = ALPHA_VALUE_RANGE.MAX,
    gradient,
  } = color;

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
          value={solid}
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
