import cn from "clsx";
import { useEffect, useState } from "react";

import { Alpha, Hex, Hsv, Rgb } from "../../types/color";
import { ColorGradientPickerTheme } from "../../types/colorGradientPicker";
import {
  hexToHsv,
  hexToRgb,
  hsvToHex,
  rgbToHex,
} from "../../utils/color/utils";
import { openNativeEyeDropper } from "../../utils/common";
import { AlphaSlider } from "./components/AlphaSlider";
import { EyeDropperButton } from "./components/EyeDropperButton";
import { HueSlider } from "./components/HueSlider";
import { InputFields } from "./components/InputFields";
import { SaturationPicker } from "./components/SaturationPicker";
import s from "./styles/SolidColorPicker.module.css";


interface ColorPickerProps {
  hex: Hex;
  alpha: Alpha;
  onEyeDropperOpenChanged?: (open: boolean) => void;
  onColorChange: (updatedHex: Hex) => void;
  onAlphaChange: (alpha: Alpha) => void;
  hasAlphaInput?: boolean;
  theme: ColorGradientPickerTheme;
}

// no need to fix this type error because this is a workaround to fix linting error
let SYNC_TIMEOUT: NodeJS.Timeout | null = null;

export function SolidColorPicker(props: ColorPickerProps) {
  const {
    hex,
    alpha,
    onEyeDropperOpenChanged,
    onColorChange,
    onAlphaChange,
    hasAlphaInput = true,
    theme,
  } = props;

  const [hsvState, setHsvState] = useState(hexToHsv(hex));
  const rgb = hexToRgb(hex);

  useEffect(() => {
    if (typeof SYNC_TIMEOUT === "number") clearTimeout(SYNC_TIMEOUT);

    // this is a workaround to fix a bug when dragging the saturation picker, it is very laggy
    // this bug happen because the hex and hsvToHex(hex) is slightly different
    // To fix this, we create a inner state hsvState to store the hsv value
    // and sync the hex and hsvState when the hex and hsvState is different

    SYNC_TIMEOUT = setTimeout(() => {
      if (hex === hsvToHex(hsvState)) return;
      console.log("syncing hex and hsvState");
      setHsvState(hexToHsv(hex));
    }, 100);
  }, [hex, hsvState]);

  // ------------------------------------------------------------------------------------------

  const handleSetHexColor = (_updatedHex: Hex, _updatedHsv?: Hsv) => {
    onColorChange(_updatedHex);
    if (_updatedHsv) {
      setHsvState(_updatedHsv);
    } else {
      setHsvState(hexToHsv(_updatedHex));
    }
  };

  const handleSetColorFromRgb = (_updatedRgb: Rgb) => {
    const { red, green, blue } = _updatedRgb;
    handleSetHexColor(
      rgbToHex({
        red: red,
        green: green,
        blue: blue,
      }),
    );
  };

  const handleEyeDropperClick = async () => {
    onEyeDropperOpenChanged?.(true);
    const _colorString = await openNativeEyeDropper(); // this will be rgb(r, g, b) in browser or #hex in electron
    onEyeDropperOpenChanged?.(false);

    const isRgbString = _colorString?.startsWith("rgb");
    const isHex = _colorString?.startsWith("#");

    if (isRgbString) {
      const numberRegex = /\d+/g;
      const [red, green, blue] = _colorString.match(numberRegex).map(Number);

      if (_colorString !== null) {
        handleSetHexColor(
          rgbToHex({
            red: red,
            green: green,
            blue: blue,
          }),
        );
      }
    } else if (isHex) {
      handleSetHexColor(_colorString);
    }
  };

  // Helper to set the color when HSV change
  const handleSetColorFromHsv = (_updatedHsv: Hsv) => {
    handleSetHexColor(hsvToHex(_updatedHsv), _updatedHsv);
  };

  return (
    <>

      <SaturationPicker
        hue={hsvState.hue}
        saturation={hsvState.saturation}
        value={hsvState.value}
        onChange={(_updatedSaturation) => {
          handleSetColorFromHsv({
            ...hsvState,
            ..._updatedSaturation,
          });
        }}
      />

      <div
        className={cn(s.sliders_wrapper, !hasAlphaInput && s.no_alpha_input)}
      >
        <div className={s.btnEye}>
          {/* @ts-expect-error check EyeDropper in window */}
          {typeof EyeDropper !== "undefined" && (
            <EyeDropperButton
              onClick={handleEyeDropperClick}
              theme={theme}
            />
          )}
        </div>
        <div className={cn(s.sliders)}>
          <HueSlider
            hue={hsvState.hue}
            onChange={(_updatedHue) => {
              handleSetColorFromHsv({
                ...hsvState,
                hue: _updatedHue,
              });
            }}
            className={s.hue_slider}
          />

          {hasAlphaInput && (
            <AlphaSlider
              alpha={alpha}
              hex={hex}
              onChange={onAlphaChange}
            />
          )}
        </div>
      </div>

      <InputFields
        hex={hex}
        rgb={rgb}
        alpha={alpha}
        setAlpha={onAlphaChange}
        setHexColor={handleSetHexColor}
        setColorFromRgb={handleSetColorFromRgb}
        hasAlphaInput={hasAlphaInput}
        showEyeDropperOnHover
        onEyeDropperClick={handleEyeDropperClick}
      />
    </>
  );
}
