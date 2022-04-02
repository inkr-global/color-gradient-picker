import { Hex, Hsv, Rgb } from "../../../utils/colorTypes";
import hexToHsv from "../../../utils/hexToHsv";
import Input from "../../Input";
import s from "./InputFields.module.css";

interface InputFieldsProps {
  hex: Hex;
  alpha: number;
  rgb: Rgb;
  setColor: (hex: Hex, hsv: Hsv) => void;
  setAlpha: (alpha: number) => void;
  setColorFromRgb: (rgb: Rgb) => void;
}

const InputFields = (props: InputFieldsProps) => {
  const { hex, alpha, rgb, setColor, setAlpha, setColorFromRgb } = props;
  const { red, green, blue } = rgb;

  return (
    <div className={s.color_inputs_wrapper}>
      <Input.Hex
        label="HEX"
        inputWidth={100}
        style={{ gridArea: "hex" }}
        value={hex}
        onChange={(_hex) => {
          setColor(_hex, hexToHsv(_hex));
        }}
      />

      <Input.Alpha
        inputWidth={40}
        style={{ gridArea: "alpha" }}
        value={alpha}
        onChange={(_alpha) => {
          setAlpha(_alpha);
        }}
      />

      <Input.Rgb
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
            green,
            blue,
          });
        }}
      />

      <Input.Rgb
        info="G"
        inputWidth={26}
        style={{ gridArea: "green" }}
        value={green}
        onChange={(_green) => {
          setColorFromRgb({
            red,
            green: _green,
            blue,
          });
        }}
      />

      <Input.Rgb
        info="B"
        inputWidth={26}
        style={{ gridArea: "blue" }}
        value={blue}
        onChange={(_blue) => {
          setColorFromRgb({
            red,
            green,
            blue: _blue,
          });
        }}
      />
    </div>
  );
};

export default InputFields;
