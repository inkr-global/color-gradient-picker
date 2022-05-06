import { UserInputProps } from "../../ColorGradientPicker.types";
import Input from "../Input";
import { ALPHA_VALUE, DEFAULT_HEX } from "../Input/constants";
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
      <Input.Alpha
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
        <Input.Hex
          {...rest}
          inputWidth={inputWidth}
          value={solid}
          onChange={onSolidColorChange}
          extraInput={alphaInput}
        />
      )}

      {type === "linear-gradient" && (
        <Input.Gradient {...rest} inputWidth={inputWidth} value={gradient} />
      )}
    </>
  );
};

export default UserInput;
