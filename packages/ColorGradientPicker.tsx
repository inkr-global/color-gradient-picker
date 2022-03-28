import cn from "clsx";
import { useCallback, useRef, useState } from "react";

import s from "./ColorGradientPicker.module.css";
import EyeDropperBtn from "./components/EyeDropper";
import HueSlider from "./components/HueSlider/HueSlider";
import Input from "./components/Input";
import SaturationPicker from "./components/SaturationPicker";
import { DEFAULT_CLASS_NAME } from "./constants";
import { ColorGradientPickerProps } from "./types";
import { Hsv } from "./utils/colorTypes";
import { openNativeEyeDropper } from "./utils/common";
import hexToHsv from "./utils/hexToHsv";
import hexToRgb from "./utils/hexToRgb";
import hsvToHex from "./utils/hsvToHex";
import sanitizeHex from "./utils/sanitizeHex";

function ColorGradientPicker(props: ColorGradientPickerProps) {
  // ------------------------------------------------------------------------------------------
  const { classNamePrefix = DEFAULT_CLASS_NAME, className } = props;

  // ------------------------------------------------------------------------------------------

  // const sanitizedColor = sanitizeHex(color || "#000000");
  const sanitizedColor = sanitizeHex("#000000");

  const [hex, setHex] = useState<string>(sanitizedColor);
  const [hsv, setHsv] = useState(hexToHsv(sanitizedColor));
  const [rgb, setRgb] = useState(hexToRgb(sanitizedColor));

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
      setColor(_hex, hexToHsv(_hex))
    }
  }, []);

  // Set the hex and hsv states/refs with updated data
  const setColor = (updatedHex: string, updatedHsv: Hsv) => {
    hexRef.current = updatedHex;
    hsvRef.current = updatedHsv;

    setHex(updatedHex);
    setHsv(updatedHsv);
    setRgb(hexToRgb(updatedHex))

    // onChange(updatedHex);
  };

  // Helper to set the color when HSV change
  const setColorFromHsv = (updatedHsv: Hsv) =>
    setColor(
      hsvToHex(updatedHsv.hue, updatedHsv.saturation, updatedHsv.value),
      updatedHsv,
    );

  const { hue, saturation, value } = hsv;
  const { red, green, blue } = rgb;

  return (
    <div className={cn(s.wrapper, classNamePrefix, className)}>
      <Input
        info={<Input.ColorPreview value="red" />}
        classNamePrefix={classNamePrefix}
        hasExtraInput
        onInputFocus={onShowPanel}
        // onInputBlur={onHidePanel}
        onExtraInputFocus={onShowPanel}
        // onExtraInputBlur={onHidePanel}
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

              <HueSlider
                hue={hue}
                onChange={(updatedHue) =>
                  setColorFromHsv({
                    ...hsvRef.current,
                    hue: updatedHue,
                  })
                }
              />
            </div>
          </div>

          <div className={s.color_inputs_wrapper}>
            <Input
              label="HEX"
              info={<Input.ColorPreview value={hex} />}
              classNamePrefix={classNamePrefix}
              inputProps={{
                style: {
                  width: 100,
                },
              }}
              style={{ gridArea: "hex" }}
              value={hex}
            />

            <Input
              info={<Input.ColorPreview value={hex} />}
              classNamePrefix={classNamePrefix}
              inputProps={{
                style: {
                  width: 28,
                },
              }}
              style={{ gridArea: "alpha" }}
            />

            <Input
              label="RGB"
              info={<Input.InputTextInfo>R</Input.InputTextInfo>}
              classNamePrefix={classNamePrefix}
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
            />

            <Input
              info={<Input.InputTextInfo>G</Input.InputTextInfo>}
              classNamePrefix={classNamePrefix}
              inputProps={{
                style: {
                  width: 26,
                },
              }}
              style={{ gridArea: "green" }}
              value={green}
            />

            <Input
              info={<Input.InputTextInfo>B</Input.InputTextInfo>}
              classNamePrefix={classNamePrefix}
              inputProps={{
                style: {
                  width: 26,
                },
              }}
              style={{ gridArea: "blue" }}
              value={blue}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ColorGradientPicker;
