import { Gradient } from "../../types/color";
import { getLinearGradientBackgroundCss, noop } from "../../utils/common";
import { InputBase } from "./Input.Base";
import { DEFAULT_HEX } from "./misc/constants";
import { BaseInputProps } from "./misc/types";
import s from "./styles/Input.Gradient.module.css";

export function InputGradient(
  props: Omit<BaseInputProps, "onChange" | "info" | "value"> & {
    value?: Gradient;
    onColorPreviewClick?: React.MouseEventHandler<HTMLDivElement>;
    theme?: "light" | "dark";
  },
) {
  const { value, onColorPreviewClick, theme, ...rest } = props;

  return (
    <InputBase
      {...rest}
      value="Gradient"
      onChange={noop}
      info={<GradientPreview onClick={onColorPreviewClick} value={value} />}
      theme={theme}
    />
  );
}

// ------------------------------------------------------------------------------------------

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
