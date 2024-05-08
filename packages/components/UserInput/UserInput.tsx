import { memo, useCallback } from "react";

import {
  ALPHA_VALUE_RANGE,
  DEFAULT_COLOR_TYPE,
  DEFAULT_HEX_DARK,
  DEFAULT_HEX_LIGHT,
} from "../../constants/colorInput";
import { DEFAULT_GRADIENT } from "../../constants/gradientPicker";
import { UserInputProps } from "../../types/colorGradientPicker";
import { rgbToHex } from "../../utils/color/utils";
import { openNativeEyeDropper } from "../../utils/common";
import { ColorInputAlpha } from "../ColorInput/ColorInput.Alpha";
import { ColorInputGradient } from "../ColorInput/ColorInput.Gradient";
import { ColorInputHex } from "../ColorInput/ColorInput.Hex";
import s from "./UserInput.module.css";


export const UserInput = memo(function UserInput({
  color,
  onSolidColorChange,
  onAlphaChange,
  hasAlphaInput,
  inputWidth = 80,
  theme,
  onEyeDropperOpenChanged,
  ...rest
}: UserInputProps) {

  const {
    type = DEFAULT_COLOR_TYPE,
    solid = theme === "dark" ? DEFAULT_HEX_DARK : DEFAULT_HEX_LIGHT,
    alpha = ALPHA_VALUE_RANGE.MAX,
    gradient = DEFAULT_GRADIENT,
  } = color || {};

  const alphaInput = hasAlphaInput ? (
    <>
      <div className={s.input_vertical_divider} />
      <ColorInputAlpha
        {...rest}
        isExtraComponent
        value={alpha}
        onChange={onAlphaChange}
        inputWidth={45}
      />
    </>
  ) : undefined;


  const shouldShowAndUpdateColorValue = !!color?.solid;


  const handleEyeDropperClick = useCallback(async () => {

    onEyeDropperOpenChanged?.(true);

    const _colorString = await openNativeEyeDropper(); // this will be rgb(r, g, b) in browser or #hex in electron

    onEyeDropperOpenChanged?.(false);

    const isRgbString = _colorString?.startsWith("rgb");
    if (isRgbString) {
      const numberRegex = /\d+/g;
      const [red, green, blue] = _colorString.match(numberRegex).map(Number);
      if (_colorString !== null) {
        onSolidColorChange(
          rgbToHex({
            red: red,
            green: green,
            blue: blue,
          }),
        );
      }
      return;
    }

    const isHex = _colorString?.startsWith("#");
    if (isHex) {
      onSolidColorChange(_colorString);
    }

  }, [onEyeDropperOpenChanged, onSolidColorChange]);


  return (
    <>

      {type === "solid" && (
        <ColorInputHex
          {...rest}
          inputWidth={inputWidth}
          value={shouldShowAndUpdateColorValue ? solid : ""} // Dont show hex value if color is undefined, fix bug in LS
          shouldUpdateColorValue={shouldShowAndUpdateColorValue}
          onChange={onSolidColorChange}
          extraInput={alphaInput}
          showEyeDropperOnHover
          onEyeDropperClick={handleEyeDropperClick}
        />
      )}

      {type === "linear-gradient" && (
        <ColorInputGradient
          {...rest}
          inputWidth={inputWidth}
          value={gradient}
        />
      )}

    </>
  );

});
