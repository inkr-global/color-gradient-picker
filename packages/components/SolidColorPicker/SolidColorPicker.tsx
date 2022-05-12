import cn from "clsx";
import { useEffect, useRef, useState } from "react";

import { Alpha, Hex, Hsv, Rgb } from "../../types/color";
import hexToHsv from "../../utils/color/hexToHsv";
import hexToRgb from "../../utils/color/hexToRgb";
import hsvToHex from "../../utils/color/hsvToHex";
import rgbToHex from "../../utils/color/rgbToHex";
import rgbToHsv from "../../utils/color/rgbToHsv";
import { openNativeEyeDropper } from "../../utils/common";
import AlphaSlider from "./components/AlphaSlider";
import EyeDropperBtn from "./components/EyeDropper";
import HueSlider from "./components/HueSlider";
import InputFields from "./components/InputFields";
import SaturationPicker from "./components/SaturationPicker";
import s from "./styles/SolidColorPicker.module.css";


interface ColorPickerProps {
  hex: Hex;
  alpha: Alpha;
  onColorChange: (updatedHex: Hex) => void;
  onAlphaChange: (alpha: Alpha) => void;
  hasAlphaInput?: boolean;
}

const SolidColorPicker = (props: ColorPickerProps) => {
  // ------------------------------------------------------------------------------------------
  const { hex, alpha, onColorChange, onAlphaChange, hasAlphaInput = true } = props;

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
  }, [hex]);

  // ------------------------------------------------------------------------------------------

  const _onSetColor = (_updatedHex: Hex, _updatedHsv: Hsv) => {
    hexRef.current = _updatedHex;
    hsvRef.current = _updatedHsv;

    onColorChange(_updatedHex);
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

      <div className={cn(s.sliders_wrapper, !hasAlphaInput && s.no_alpha_input)}>
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

          {hasAlphaInput && (
            <AlphaSlider alpha={alpha} hex={hex} onChange={onAlphaChange} />
          )}

        </div>
      </div>

      <InputFields
        hex={hex}
        rgb={rgb}
        alpha={alpha}
        setAlpha={onAlphaChange}
        setColor={_onSetColor}
        setColorFromRgb={_onSetColorFromRgb}
        hasAlphaInput={hasAlphaInput}
      />
    </>
  );
};

export default SolidColorPicker;
