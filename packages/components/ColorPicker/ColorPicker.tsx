import cn from "clsx";
import { useEffect, useRef, useState } from "react";

import { VALUE_COLOR_TYPE } from "../../types";
import { Hex, Hsv, Rgb } from "../../utils/colorTypes";
import { openNativeEyeDropper } from "../../utils/common";
import hexToHsv from "../../utils/hexToHsv";
import hexToRgb from "../../utils/hexToRgb";
import hsvToHex from "../../utils/hsvToHex";
import rgbToHex from "../../utils/rgbToHex";
import rgbToHsv from "../../utils/rgbToHsv";
import s from "./ColorPicker.module.css";
import AlphaSlider from "./components/AlphaSlider";
import EyeDropperBtn from "./components/EyeDropper";
import HueSlider from "./components/HueSlider";
import InputFields from "./components/InputFields";
import SaturationPicker from "./components/SaturationPicker";

interface ColorPickerProps {
  hex: Hex;
  alpha: number;
  type: VALUE_COLOR_TYPE;
  onSetColor: (updatedHex: Hex) => void;
  onAlphaChange: (alpha: number) => void;
  onSetColorType: (type: VALUE_COLOR_TYPE) => void;
}

const ColorPicker = (props: ColorPickerProps) => {
  // ------------------------------------------------------------------------------------------
  const { hex, alpha, onSetColor, onAlphaChange } = props;

  const [, setHexState] = useState<Hex>(hex);

  // ------------------------------------------------------------------------------------------
  const hsvRef = useRef(hexToHsv(hex));
  const hexRef = useRef(hex);

  const { hue, saturation, value } = hsvRef.current;
  const rgb = hexToRgb(hexRef.current);

  // ------------------------------------------------------------------------------------------

  useEffect(() => {
    hsvRef.current = hexToHsv(hex);
    hexRef.current = hex;
    setHexState(hex);
  }, [hex])

  // ------------------------------------------------------------------------------------------

  const _onSetColor = (_updatedHex: Hex, _updatedHsv: Hsv) => {
    hexRef.current = _updatedHex;
    hsvRef.current = _updatedHsv;

    onSetColor(_updatedHex);
  };

  const _onSetColorFromRgb = (updatedRgb: Rgb) => {
    const { red, green, blue } = updatedRgb;

    _onSetColor(rgbToHex(red, green, blue), rgbToHsv(red, green, blue));
  };

  const _onEyeDropperClick = async () => {
    const _hex = await openNativeEyeDropper();

    if (_hex !== null) {
      _onSetColor(_hex, hexToHsv(_hex));
    }
  };

  // Helper to set the color when HSV change
  const _onSetColorFromHsv = (_updatedHsv: Hsv) => {
    _onSetColor(
      hsvToHex(_updatedHsv.hue, _updatedHsv.saturation, _updatedHsv.value),
      _updatedHsv,
    );
  };

  return (
    <>
      <SaturationPicker
        hue={hue}
        saturation={saturation}
        value={value}
        onChange={(_saturationValue) => {
          _onSetColorFromHsv({
            ...hsvRef.current,
            ..._saturationValue,
          });
        }}
      />

      <div className={cn(s.sliders_wrapper)}>
        <EyeDropperBtn onClick={_onEyeDropperClick} />

        <div className={cn(s.sliders)}>
          <HueSlider
            hue={hue}
            onChange={(updatedHue) =>
              _onSetColorFromHsv({
                ...hsvRef.current,
                hue: updatedHue,
              })
            }
            className={s.hue_slider}
          />

          <AlphaSlider alpha={alpha} hex={hex} onChange={onAlphaChange} />
        </div>
      </div>

      <InputFields
        hex={hex}
        rgb={rgb}
        alpha={alpha}
        setAlpha={onAlphaChange}
        setColor={_onSetColor}
        setColorFromRgb={_onSetColorFromRgb}
      />
    </>
  );
};

export default ColorPicker;
