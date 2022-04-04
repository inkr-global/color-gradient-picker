import { ColorValue } from "../../types";
import { Hex } from "../../utils/colorTypes";
import Input from "../Input";
import { ALPHA_VALUE, DEFAULT_HEX } from "../Input/constants";
import { InputProps } from "../Input/types";
import s from "./UserInput.module.css";

interface UserInputProps extends InputProps {
  color: ColorValue;
  onSolidColorChange: (hex: Hex) => void;
  onAlphaChange: (alpha: number) => void;
  hasAlphaInput?: boolean;
}

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

      {type === "linear" && (
        <Input.Gradient {...rest} inputWidth={inputWidth} value={gradient} />
      )}
    </>
  );
};

export default UserInput;
