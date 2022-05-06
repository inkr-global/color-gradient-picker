import { UserInputProps } from "../../ColorGradientPicker.types";
import { ALPHA_VALUE, DEFAULT_HEX } from "../Input/constants";
import { InputAlpha } from "../Input/Input.Alpha";
import { InputGradient } from "../Input/Input.Gradient";
import { InputHex } from "../Input/Input.Hex";
import s from "./UserInput.module.css";


const UserInput = (props: UserInputProps) => {
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
        />
      )}

      {type === "linear-gradient" && (
        <InputGradient {...rest} inputWidth={inputWidth} value={gradient} />
      )}
    </>
  );
};

export default UserInput;
