import { CSSProperties, memo, useCallback, useMemo } from "react";

import { DEFAULT_HEX_DARK } from "../../constants/colorInput";
import { Gradient } from "../../types/color";
import { ColorInputCoreProps } from "../../types/colorInput";
import { getLinearGradientBackgroundCss } from "../../utils/common";
import { ColorInputBase } from "./ColorInput.Core";
import s from "./styles/Input.Gradient.module.css";


interface ColorInputGradientProps extends Omit<ColorInputCoreProps, "onChange" | "info" | "value"> {
  value?: Gradient;
  onColorPreviewClick?: React.MouseEventHandler<HTMLDivElement>;
}


export const ColorInputGradient = memo(function ColorInputGradient({
  value,
  onColorPreviewClick,
  ...rest
}: ColorInputGradientProps) {

  return (
    <ColorInputBase
      {...rest}
      value="Gradient"
      onChange={useCallback(() => undefined, [])}
      info={(
        <GradientPreview
          onClick={onColorPreviewClick}
          value={value}
        />
      )}
    />
  );

});


// ------------------------------------------------------------------------------------------

const GradientPreview = memo(function GradientPreview({
  value,
  onClick,
}: {
  value?: Gradient;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {

  let color = DEFAULT_HEX_DARK; // TODO: add theme support
  if (typeof value !== "undefined") {
    color = getLinearGradientBackgroundCss(value);
  }

  return (
    <div
      style={useMemo((): CSSProperties => ({
        background: color,
      }), [color])}
      className={s.gradient_preview}
      onClick={onClick}
      role="presentation"
    />
  );

});
