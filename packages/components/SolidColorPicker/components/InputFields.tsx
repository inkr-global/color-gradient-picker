import clsx from "clsx";

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
}

export const InputFields = (props: InputFieldsProps) => {
  const {
    hex,
    alpha,
    rgb,
    setHexColor,
    setAlpha,
    setColorFromRgb,
    hasAlphaInput = true,
  } = props;
  const { red, green, blue } = rgb;

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
        onChange={(_hex) => {
          setHexColor(_hex, hexToHsv(_hex));
        }}
      />

      {hasAlphaInput && (
        <ColorInputAlpha
          inputWidth={40}
          className={s.alpha}
          value={alpha}
          onChange={(_alpha) => {
            setAlpha(_alpha);
          }}
        />
      )}

      <ColorInputRgb
        label="RGB"
        info="R"
        inputWidth={31}
        className={s.red}
        value={red}
        onChange={(_red) => {
          setColorFromRgb({
            red: _red,
            green: green,
            blue: blue,
          });
        }}
      />

      <ColorInputRgb
        info="G"
        inputWidth={31}
        className={s.green}
        value={green}
        onChange={(_green) => {
          setColorFromRgb({
            red: red,
            green: _green,
            blue: blue,
          });
        }}
      />

      <ColorInputRgb
        info="B"
        inputWidth={31}
        className={s.blue}
        value={blue}
        onChange={(_blue) => {
          setColorFromRgb({
            red: red,
            green: green,
            blue: _blue,
          });
        }}
      />
    </div>
  );
};
