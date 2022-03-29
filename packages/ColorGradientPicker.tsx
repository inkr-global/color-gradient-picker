import cn from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

import s from "./ColorGradientPicker.module.css";
import AlphaSlider from "./components/AlphaSlider";
import EyeDropperBtn from "./components/EyeDropper";
import HueSlider from "./components/HueSlider/HueSlider";
import Input from "./components/Input";
import InputFields from "./components/InputFields";
import SaturationPicker from "./components/SaturationPicker";
import { DEFAULT_CLASS_NAME } from "./constants";
import { ColorGradientPickerProps } from "./types";
import { Hsv, Rgb } from "./utils/colorTypes";
import { openNativeEyeDropper } from "./utils/common";
import hexToHsv from "./utils/hexToHsv";
import hexToRgb from "./utils/hexToRgb";
import hsvToHex from "./utils/hsvToHex";
import rgbToHex from "./utils/rgbToHex";
import sanitizeHex from "./utils/sanitizeHex";

function ColorGradientPicker(props: ColorGradientPickerProps) {
  // ------------------------------------------------------------------------------------------
  const {
    classNamePrefix = DEFAULT_CLASS_NAME,
    className,
    value: valueProp,
    onChange,
  } = props;

  // ------------------------------------------------------------------------------------------

  const propColorHex = sanitizeHex(valueProp?.hex || "#000");
  const propAlpha = valueProp?.alpha || 100;

  const [alpha, setAlphaState] = useState<number>(propAlpha);
  const [hex, setHex] = useState<string>(propColorHex);

  const [isOpenPicker, setOpenPicker] = useState<boolean>(false);

  const hsvRef = useRef(hexToHsv(hex));
  const hexRef = useRef(hex);

  const containerRef = useRef<HTMLDivElement>(null);

  // ------------------------------------------------------------------------------------------
  // close picker when click outside
  useEffect(() => {
    if (typeof document === "undefined") return () => undefined;

    const handler = (e: Event) => {
      if (!containerRef.current?.contains(e.target as HTMLElement)) {
        setOpenPicker(false);
      }
    };

    document.addEventListener("click", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return () => undefined;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenPicker(false);
        (document.activeElement as HTMLInputElement)?.blur();
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);

  // ------------------------------------------------------------------------------------------

  const onShowPanel = useCallback(() => {
    setOpenPicker(true);
  }, []);

  // ------------------------------------------------------------------------------------------

  // Set the hex and hsv states/refs with updated data
  const setColor = (_updatedHex: string) => {
    const updatedHsv = hexToHsv(_updatedHex);

    hexRef.current = _updatedHex;
    hsvRef.current = updatedHsv;

    setHex(_updatedHex);

    onChange({
      hex: _updatedHex,
      alpha,
    });
  };

  const setAlpha = (_alpha: number) => {
    setAlphaState(_alpha);

    onChange({
      alpha: _alpha,
      hex,
    });
  };

  const onEyeDropperClick = async () => {
    const _hex = await openNativeEyeDropper();

    if (_hex !== null) {
      setColor(_hex);
    }
  };

  // Helper to set the color when HSV change
  const setColorFromHsv = (_updatedHsv: Hsv) => {
    setColor(
      hsvToHex(_updatedHsv.hue, _updatedHsv.saturation, _updatedHsv.value),
    );
  };

  const setColorFromRgb = (updatedRgb: Rgb) => {
    const { red, green, blue } = updatedRgb;

    setColor(rgbToHex(red, green, blue));
  };

  // ------------------------------------------------------------------------------------------

  const { hue, saturation, value } = hexToHsv(propColorHex);
  const propRgb = hexToRgb(propColorHex);

  return (
    <div
      ref={containerRef}
      className={cn(s.wrapper, classNamePrefix, className)}
    >
      <Input.ColorHex
        onInputFocus={onShowPanel}
        value={propColorHex}
        onChange={(_hex) => {
          setColor(_hex);
        }}
      />

      {isOpenPicker && (
        <div className={cn(s.picking_panel)}>
          <SaturationPicker
            hue={hue}
            saturation={saturation}
            value={value}
            onChange={(updatedSaturationValue) =>
              setColorFromHsv({
                ...hsvRef.current,
                ...updatedSaturationValue,
              })
            }
          />

          <div className={cn(s.sliders_wrapper)}>
            <EyeDropperBtn onClick={onEyeDropperClick} />

            <div className={cn(s.sliders)}>
              <HueSlider
                hue={hue}
                onChange={(updatedHue) =>
                  setColorFromHsv({
                    ...hsvRef.current,
                    hue: updatedHue,
                  })
                }
                className={s.hue_slider}
              />

              <AlphaSlider
                alpha={propAlpha}
                hex={propColorHex}
                onChange={(updatedAlpha) => setAlpha(updatedAlpha)}
              />
            </div>
          </div>

          <InputFields
            hex={propColorHex}
            rgb={propRgb}
            alpha={propAlpha}
            setAlpha={setAlpha}
            setColor={setColor}
            setColorFromRgb={setColorFromRgb}
          />
        </div>
      )}
    </div>
  );
}

export default ColorGradientPicker;
