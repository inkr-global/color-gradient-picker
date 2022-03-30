import cn from "clsx";
import { useRef } from "react";

import { VALUE_COLOR_TYPE } from "../../types";
import { Hex, Hsv, Rgb } from "../../utils/colorTypes";
import { openNativeEyeDropper } from "../../utils/common";
import hexToHsv from "../../utils/hexToHsv";
import hexToRgb from "../../utils/hexToRgb";
import hsvToHex from "../../utils/hsvToHex";
import rgbToHex from "../../utils/rgbToHex";
import rgbToHsv from "../../utils/rgbToHsv";
import AlphaSlider from "../AlphaSlider";
import ColorTypeSelect from "../ColorTypeSelect";
import EyeDropperBtn from "../EyeDropper";
import HueSlider from "../HueSlider";
import SaturationPicker from "../SaturationPicker";
import s from "./ColorPicker.module.css";
import InputFields from "./InputFields";

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
  const { hex, alpha, type, onSetColor, onAlphaChange, onSetColorType } = props;

  const hsvRef = useRef(hexToHsv(hex));
  const hexRef = useRef(hex);

  const { hue, saturation, value } = hsvRef.current;
  const rgb = hexToRgb(hexRef.current);

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
    <div className={cn(s.picking_panel)}>
      <div className={s.select_wrapper}>
        <ColorTypeSelect value={type} onChange={onSetColorType} />
      </div>

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
    </div>
  );
};

export default ColorPicker;
