import { Gradient } from "../../types/color";
import { getLinearGradientBackgroundCss, noop } from "../../utils/common";
import { DEFAULT_HEX } from "./constants";
import { InputBase } from "./Input.Base";
import s from "./styles/Input.Gradient.module.css";
import { BaseInputProps } from "./types";


function GradientPreview(props: { value?: Gradient }) {
  const { value } = props;

  let color = DEFAULT_HEX;
  if (typeof value !== "undefined") {
    color = getLinearGradientBackgroundCss(value);
  }

  return (
    <div
      style={{
        background: color,
      }}
      className={s.gradient_preview}
    />
  );
}

// ------------------------------------------------------------------------------------------
export function InputGradient(
  props: Omit<BaseInputProps, "onChange" | "info" | "value"> & {
    value?: Gradient;
  },
) {
  const { value, ...rest } = props;

  // -----------------------------------------------------------------------
  return (
    <InputBase
      {...rest}
      value="Gradient"
      onChange={noop}
      info={<GradientPreview value={value} />}
    />
  );
}
