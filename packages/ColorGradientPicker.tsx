import cn from "clsx";
import { useCallback, useRef, useState } from "react";

import s from "./ColorGradientPicker.module.css";
import AlphaSlider from "./components/AlphaSlider";
import EyeDropperBtn from "./components/EyeDropper";
import HueSlider from "./components/HueSlider/HueSlider";
import Input from "./components/Input";
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
  const { classNamePrefix = DEFAULT_CLASS_NAME, className } = props;

  // ------------------------------------------------------------------------------------------

  // const sanitizedColor = sanitizeHex(color || "#000000");
  const sanitizedColor = sanitizeHex("#000000");

  const [alpha, setAlpha] = useState<number>(100);
  const [hex, setHex] = useState<string>(sanitizedColor);
  const [hsv, setHsv] = useState(hexToHsv(sanitizedColor));

  const [isOpenPicker, setOpenPicker] = useState<boolean>(false);

  const hsvRef = useRef(hsv);
  const hexRef = useRef(hex);

  // ------------------------------------------------------------------------------------------

  const onShowPanel = useCallback(() => {
    setOpenPicker(true);
  }, []);

  // const onHidePanel = useCallback(() => {
  //   setOpenPicker(false);
  // }, []);

  // ------------------------------------------------------------------------------------------

  const onEyeDropperClick = useCallback(async () => {
    const _hex = await openNativeEyeDropper();

    if (_hex !== null) {
      setColor(_hex);
    }
  }, []);

  // Set the hex and hsv states/refs with updated data
  const setColor = (updatedHex: string) => {
    const updatedHsv = hexToHsv(updatedHex);

    hexRef.current = updatedHex;
    hsvRef.current = updatedHsv;

    setHex(updatedHex);
    setHsv(updatedHsv);

    // onChange(updatedHex);
  };

  // Helper to set the color when HSV change
  const setColorFromHsv = (updatedHsv: Hsv) => {
    setColor(hsvToHex(updatedHsv.hue, updatedHsv.saturation, updatedHsv.value));
  };

  const setColorFromRgb = (updatedRgb: Rgb) => {
    const { red, green, blue } = updatedRgb;

    setColor(rgbToHex(red, green, blue));
  };

  // ------------------------------------------------------------------------------------------

  const { hue, saturation, value } = hsv;
  const { red, green, blue } = hexToRgb(hex);

  return (
    <div className={cn(s.wrapper, classNamePrefix, className)}>
      <Input.ColorHex
        onInputFocus={onShowPanel}
        value={hex}
        extraInputValue={alpha}
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
                alpha={alpha}
                hex={hex}
                onChange={(updatedAlpha) => setAlpha(updatedAlpha)}
              />
            </div>
          </div>

          <div className={s.color_inputs_wrapper}>
            <Input.ColorHex
              label="HEX"
              inputProps={{
                style: {
                  width: 100,
                },
              }}
              style={{ gridArea: "hex" }}
              value={hex}
              onChange={(_hex) => {
                setColor(_hex);
              }}
            />

            <Input.Alpha
              inputProps={{
                style: {
                  width: 40,
                },
              }}
              style={{ gridArea: "alpha" }}
              value={alpha}
              onChange={(_alpha) => {
                setAlpha(_alpha);
              }}
            />

            <Input.Rgb
              label="RGB"
              info="R"
              inputProps={{
                style: {
                  width: 26,
                },
              }}
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
              inputProps={{
                style: {
                  width: 26,
                },
              }}
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
              inputProps={{
                style: {
                  width: 26,
                },
              }}
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
        </div>
      )}
    </div>
  );
}

export default ColorGradientPicker;
