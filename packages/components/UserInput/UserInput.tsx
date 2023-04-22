import { UserInputProps } from "../../ColorGradientPicker.types";
import { InputAlpha } from "../ColorInput/Input.Alpha";
import { InputGradient } from "../ColorInput/Input.Gradient";
import { InputHex } from "../ColorInput/Input.Hex";
import { ALPHA_VALUE, DEFAULT_HEX } from "../ColorInput/misc/constants";
import s from "./UserInput.module.css";

const UserInput = (props: UserInputProps) => {
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
    type,
    solid = DEFAULT_HEX,
    alpha = ALPHA_VALUE.MAX,
    gradient,
  } = color;

  const alphaInput = hasAlphaInput ? (
    <>
      <div className={s.input_vertical_divider} />
      <InputAlpha
        {...rest}
        isExtraComponent
        value={alpha}
        onChange={onAlphaChange}
        inputWidth={45}
        theme={theme}
      />
    </>
  ) : undefined;

  return (
    <>
      {type === "solid" && (
        <InputHex
          {...rest}
          inputWidth={inputWidth}
          value={solid}
          onChange={onSolidColorChange}
          extraInput={alphaInput}
          theme={theme}
        />
      )}

      {type === "linear-gradient" && (
        <InputGradient
          {...rest}
          inputWidth={inputWidth}
          value={gradient}
          theme={theme}
        />
      )}
    </>
  );
};

export default UserInput;
