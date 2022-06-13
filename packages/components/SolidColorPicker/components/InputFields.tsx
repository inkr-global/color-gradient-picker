import clsx from "clsx";

import { Alpha, Hex, Hsv, Rgb } from "../../../types/color";
import hexToHsv from "../../../utils/color/hexToHsv";
import { InputAlpha } from "../../Input/Input.Alpha";
import { InputHex } from "../../Input/Input.Hex";
import { InputRgb } from "../../Input/Input.Rgb";
import s from "../styles/InputFields.module.css";


interface InputFieldsProps {
  hex: Hex;
  alpha: Alpha;
  rgb: Rgb;
  setColor: (hex: Hex, hsv: Hsv) => void;
  setAlpha: (alpha: Alpha) => void;
  setColorFromRgb: (rgb: Rgb) => void;
  hasAlphaInput?: boolean;
  theme?: "light" | "dark";
}

const InputFields = (props: InputFieldsProps) => {
  const { hex, alpha, rgb, setColor, setAlpha, setColorFromRgb, hasAlphaInput = true, theme } = props;
  const { red, green, blue } = rgb;

  return (
    <div className={clsx(s.color_inputs_wrapper, !hasAlphaInput && s.no_alpha_input)}>
      <InputHex
        label="HEX"
        inputWidth={hasAlphaInput ? 100 : 180}
        className={s.hex}
        value={hex}
        onChange={(_hex) => {
          setColor(_hex, hexToHsv(_hex));
        }}
        theme={theme}
      />

      {hasAlphaInput && (
        <InputAlpha
          inputWidth={40}
          className={s.alpha}
          value={alpha}
          onChange={(_alpha) => {
            setAlpha(_alpha);
          }}
          theme={theme}
        />
      )}


      <InputRgb
        label="RGB"
        info="R"
        inputWidth={26}
        className={s.red}
        value={red}
        onChange={(_red) => {
          setColorFromRgb({
            red: _red,
            green: green,
            blue: blue,
          });
        }}
        theme={theme}
      />

      <InputRgb
        info="G"
        inputWidth={26}
        className={s.green}
        value={green}
        onChange={(_green) => {
          setColorFromRgb({
            red: red,
            green: _green,
            blue: blue,
          });
        }}
        theme={theme}
      />

      <InputRgb
        info="B"
        inputWidth={26}
        className={s.blue}
        value={blue}
        onChange={(_blue) => {
          setColorFromRgb({
            red: red,
            green: green,
            blue: _blue,
          });
        }}
        theme={theme}
      />
    </div>
  );
};

export default InputFields;
