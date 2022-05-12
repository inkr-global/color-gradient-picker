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
}

const InputFields = (props: InputFieldsProps) => {
  const { hex, alpha, rgb, setColor, setAlpha, setColorFromRgb } = props;
  const { red, green, blue } = rgb;

  return (
    <div className={s.color_inputs_wrapper}>
      <InputHex
        label="HEX"
        inputWidth={100}
        style={{ gridArea: "hex" }}
        value={hex}
        onChange={(_hex) => {
          setColor(_hex, hexToHsv(_hex));
        }}
      />

      <InputAlpha
        inputWidth={40}
        style={{ gridArea: "alpha" }}
        value={alpha}
        onChange={(_alpha) => {
          setAlpha(_alpha);
        }}
      />

      <InputRgb
        label="RGB"
        info="R"
        inputWidth={26}
        style={{
          gridArea: "red",
          marginLeft: -2,
        }}
        value={red}
        onChange={(_red) => {
          setColorFromRgb({
            red: _red,
            green: green,
            blue: blue,
          });
        }}
      />

      <InputRgb
        info="G"
        inputWidth={26}
        style={{ gridArea: "green" }}
        value={green}
        onChange={(_green) => {
          setColorFromRgb({
            red: red,
            green: _green,
            blue: blue,
          });
        }}
      />

      <InputRgb
        info="B"
        inputWidth={26}
        style={{ gridArea: "blue" }}
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

export default InputFields;
