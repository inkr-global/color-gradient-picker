import clsx from "clsx";
import { useCallback } from "react";

import { Alpha, Hex, Hsv, Rgb } from "../../../types/color";
import { hexToHsv } from "../../../utils/color/utils";
import { ColorInputAlpha } from "../../ColorInput/ColorInput.Alpha";
import { ColorInputHex } from "../../ColorInput/ColorInput.Hex";
import { ColorInputRgb } from "../../ColorInput/ColorInput.Rgb";
import s from "../styles/InputFields.module.css";


interface InputFieldsProps {
  hex: Hex;
  alpha: Alpha;
  rgb: Rgb;
  setAlpha: (alpha: Alpha) => void;
  setHexColor: (hex: Hex, hsv: Hsv) => void;
  setColorFromRgb: (rgb: Rgb) => void;
  hasAlphaInput?: boolean;
  showEyeDropperOnHover?: boolean;
  onEyeDropperClick?: () => void;
}


export function InputFields({
  hex,
  alpha,
  rgb,
  setHexColor,
  setAlpha,
  setColorFromRgb,
  hasAlphaInput = true,
  showEyeDropperOnHover = false,
  onEyeDropperClick,
}: InputFieldsProps) {

  const {
    red,
    green,
    blue,
  } = rgb;

  const handleInputAlphaChange = useCallback((_alpha: number) => {
    setAlpha(_alpha);
  }, [setAlpha]);

  return (
    <div
      className={clsx(
        s.color_inputs_wrapper,
        !hasAlphaInput && s.no_alpha_input,
      )}
    >

      <ColorInputHex
        label="HEX"
        inputWidth={hasAlphaInput ? 100 : 180}
        className={s.hex}
        value={hex}
        onChange={useCallback((_hex) => {
          setHexColor(_hex, hexToHsv(_hex));
        }, [setHexColor])}
        showEyeDropperOnFocus={showEyeDropperOnHover}
        onEyeDropperClick={onEyeDropperClick}
      />

      {hasAlphaInput && (
        <ColorInputAlpha
          inputWidth={40}
          className={s.alpha}
          value={alpha}
          onChange={handleInputAlphaChange}
        />
      )}

      <ColorInputRgb
        label="RGB"
        info="R"
        inputWidth={31}
        className={s.red}
        value={red}
        onChange={useCallback((_red) => {
          setColorFromRgb({
            red: _red,
            green: green,
            blue: blue,
          });
        }, [blue, green, setColorFromRgb])}
      />

      <ColorInputRgb
        info="G"
        inputWidth={31}
        className={s.green}
        value={green}
        onChange={useCallback((_green) => {
          setColorFromRgb({
            red: red,
            green: _green,
            blue: blue,
          });
        }, [blue, red, setColorFromRgb])}
      />

      <ColorInputRgb
        info="B"
        inputWidth={31}
        className={s.blue}
        value={blue}
        onChange={useCallback((_blue) => {
          setColorFromRgb({
            red: red,
            green: green,
            blue: _blue,
          });
        }, [green, red, setColorFromRgb])}
      />

    </div>
  );
}
