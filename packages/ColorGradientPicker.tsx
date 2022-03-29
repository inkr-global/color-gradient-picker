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
import { Hex, Hsv, Rgb } from "./utils/colorTypes";
import { openNativeEyeDropper } from "./utils/common";
import hexToHsv from "./utils/hexToHsv";
import hexToRgb from "./utils/hexToRgb";
import hsvToHex from "./utils/hsvToHex";
import rgbToHex from "./utils/rgbToHex";
import rgbToHsv from "./utils/rgbToHsv";
import sanitizeHex from "./utils/sanitizeHex";

function ColorGradientPicker(props: ColorGradientPickerProps) {
  // ------------------------------------------------------------------------------------------
  const {
    classNamePrefix = DEFAULT_CLASS_NAME,
    className,
    value: valueProp,
    onChange,
    inputWidth,
    onInputBlur,
    onKeyDown,
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
  const setColor = (_updatedHex: Hex, _updatedHsv: Hsv) => {
    hexRef.current = _updatedHex;
    hsvRef.current = _updatedHsv;

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
      setColor(_hex, hexToHsv(_hex));
    }
  };

  // Helper to set the color when HSV change
  const setColorFromHsv = (_updatedHsv: Hsv) => {
    setColor(
      hsvToHex(_updatedHsv.hue, _updatedHsv.saturation, _updatedHsv.value),
      _updatedHsv,
    );
  };

  const setColorFromRgb = (updatedRgb: Rgb) => {
    const { red, green, blue } = updatedRgb;

    setColor(rgbToHex(red, green, blue), rgbToHsv(red, green, blue));
  };

  // ------------------------------------------------------------------------------------------

  const { hue, saturation, value } = hsvRef.current;
  const rgb = hexToRgb(hexRef.current);

  return (
    <div
      ref={containerRef}
      className={cn(s.wrapper, classNamePrefix, className)}
    >
      <Input.ColorHex
        onInputFocus={onShowPanel}
        value={hex}
        onChange={(_hex) => {
          setColor(_hex, hexToHsv(_hex));
        }}
        inputWidth={inputWidth}
        onInputBlur={onInputBlur}
        onKeyDown={onKeyDown}
        extraInput={
          <>
            <div className={s.vertical_divider} />
            <Input.Alpha
              isExtraComponent
              value={propAlpha}
              onChange={setAlpha}
              inputWidth={45}
              onInputBlur={onInputBlur}
              onKeyDown={onKeyDown}
            />
          </>
        }
      />

      {isOpenPicker && (
        <div className={cn(s.picking_panel)}>
          <SaturationPicker
            hue={hue}
            saturation={saturation}
            value={value}
            onChange={(updatedSaturationValue) => {
              setColorFromHsv({
                ...hsvRef.current,
                ...updatedSaturationValue,
              });
            }}
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
                hex={hex}
                onChange={(updatedAlpha) => setAlpha(updatedAlpha)}
              />
            </div>
          </div>

          <InputFields
            hex={hex}
            rgb={rgb}
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
