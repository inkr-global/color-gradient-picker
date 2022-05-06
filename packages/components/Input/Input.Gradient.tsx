import { Gradient } from "../../colorTypes";
import { getLinearGradientBackgroundCss, noop } from "../GradientPicker/utils";
import { DEFAULT_HEX } from "./constants";
import { BaseInput } from "./Input";
import s from "./Input.Gradient.module.css";
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
    <BaseInput
      {...rest}
      value="Gradient"
      onChange={noop}
      info={<GradientPreview value={value} />}
    />
  );
}
