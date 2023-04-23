import { DEFAULT_HEX } from "../../constants/colorInput";
import { Gradient } from "../../types/color";
import { ColorInputCoreProps } from "../../types/colorInput";
import { getLinearGradientBackgroundCss } from "../../utils/common";
import { ColorInputBase } from "./ColorInput.Core";
import s from "./styles/Input.Gradient.module.css";

export function ColorInputGradient(
  props: Omit<ColorInputCoreProps, "onChange" | "info" | "value"> & {
    value?: Gradient;
    onColorPreviewClick?: React.MouseEventHandler<HTMLDivElement>;
  },
) {
  const { value, onColorPreviewClick, ...rest } = props;

  return (
    <ColorInputBase
      {...rest}
      value="Gradient"
      info={<GradientPreview onClick={onColorPreviewClick} value={value} />}
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
