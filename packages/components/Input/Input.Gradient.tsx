import { Gradient } from "../../types/color";
import { getLinearGradientBackgroundCss, noop } from "../../utils/common";
import { DEFAULT_HEX } from "./constants";
import { InputBase } from "./Input.Base";
import s from "./styles/Input.Gradient.module.css";
import { BaseInputProps } from "./types";

function GradientPreview(props: {
  value?: Gradient;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
  const { value, onClick } = props;

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
      onClick={onClick}
    />
  );
}

// ------------------------------------------------------------------------------------------
export function InputGradient(
  props: Omit<BaseInputProps, "onChange" | "info" | "value"> & {
    value?: Gradient;
    onColorPreviewClick?: React.MouseEventHandler<HTMLDivElement>;
  },
) {
  const { value, onColorPreviewClick, ...rest } = props;

  // -----------------------------------------------------------------------
  return (
    <InputBase
      {...rest}
      value="Gradient"
      onChange={noop}
      info={<GradientPreview onClick={onColorPreviewClick} value={value} />}
    />
  );
}
