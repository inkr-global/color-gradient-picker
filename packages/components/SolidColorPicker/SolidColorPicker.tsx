import cn from "clsx";
import { useRef } from "react";

import { Alpha, Hex, Hsv, Rgb } from "../../types/color";
import { ColorGradientPickerTheme } from "../../types/colorGradientPicker";
import hexToHsv from "../../utils/color/hexToHsv";
import hexToRgb from "../../utils/color/hexToRgb";
import hsvToHex from "../../utils/color/hsvToHex";
import rgbToHex from "../../utils/color/rgbToHex";
import rgbToHsv from "../../utils/color/rgbToHsv";
import { openNativeEyeDropper } from "../../utils/common";
import { AlphaSlider } from "./components/AlphaSlider";
import { EyeDropper } from "./components/EyeDropper";
import { HueSlider } from "./components/HueSlider";
import { InputFields } from "./components/InputFields";
import { SaturationPicker } from "./components/SaturationPicker";
import s from "./styles/SolidColorPicker.module.css";

interface ColorPickerProps {
  hex: Hex;
  alpha: Alpha;
  onColorChange: (updatedHex: Hex) => void;
  onAlphaChange: (alpha: Alpha) => void;
  hasAlphaInput?: boolean;
  theme: ColorGradientPickerTheme;
}

export const SolidColorPicker = (props: ColorPickerProps) => {
  const {
    hex,
    alpha,
    onColorChange,
    onAlphaChange,
    hasAlphaInput = true,
    theme,
  } = props;

  // ------------------------------------------------------------------------------------------
  const hsvRef = useRef(hexToHsv(hex));
  const hexRef = useRef(hex);
  hsvRef.current = hexToHsv(hex);
  hexRef.current = hex;

  const { hue, saturation, value } = hsvRef.current;
  const rgb = hexToRgb(hexRef.current);

  // ------------------------------------------------------------------------------------------

  const handleSetColor = (_updatedHex: Hex, _updatedHsv: Hsv) => {
    hexRef.current = _updatedHex;
    hsvRef.current = _updatedHsv;

    onColorChange(_updatedHex);
  };

  const handleSetColorFromRgb = (updatedRgb: Rgb) => {
    const { red, green, blue } = updatedRgb;

    handleSetColor(rgbToHex(red, green, blue), rgbToHsv(red, green, blue));
  };

  const handleEyeDropperClick = async () => {
    const _colorString = await openNativeEyeDropper(); // this will be rgb(r, g, b) in browser or #hex in electron
    const numberRegex = /\d+/g;

    const isRgbString = _colorString?.startsWith("rgb");
    const isHex = _colorString?.startsWith("#");

    if (isRgbString) {
      const [red, green, blue] = _colorString.match(numberRegex).map(Number);

      if (_colorString !== null) {
        handleSetColor(rgbToHex(red, green, blue), rgbToHsv(red, green, blue));
      }
    } else if (isHex) {
      handleSetColor(_colorString, hexToHsv(_colorString));
    }
  };

  // Helper to set the color when HSV change
  const handleSetColorFromHsv = (_updatedHsv: Hsv) => {
    handleSetColor(
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
          handleSetColorFromHsv({
            ...hsvRef.current,
            ..._saturationValue,
          });
        }}
      />

      <div
        className={cn(s.sliders_wrapper, !hasAlphaInput && s.no_alpha_input)}
      >
        <div className={s.btnEye}>
          <EyeDropper onClick={handleEyeDropperClick} theme={theme} />
        </div>
        <div className={cn(s.sliders)}>
          <HueSlider
            hue={hue}
            onChange={(updatedHue) =>
              handleSetColorFromHsv({
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
        setColor={handleSetColor}
        setColorFromRgb={handleSetColorFromRgb}
        hasAlphaInput={hasAlphaInput}
      />
    </>
  );
};
