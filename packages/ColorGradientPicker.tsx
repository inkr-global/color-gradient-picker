import cn from "clsx";
import { useCallback, useRef, useState } from "react";

import s from "./ColorGradientPicker.module.css";
import EyeDropper from "./components/EyeDropper";
import HueSlider from "./components/HueSlider/HueSlider";
import Input from "./components/Input";
import SaturationPicker from "./components/SaturationPicker";
import { DEFAULT_CLASS_NAME } from "./constants";
import { ColorGradientPickerProps } from "./types";
import { Hsv } from "./utils/colorTypes";
import hexToHsv from "./utils/hexToHsv";
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

  const [isOpenPicker, setOpenPicker] = useState<boolean>(false);

  const hsvRef = useRef(hsv);
  const hexRef = useRef(hex);

  // ------------------------------------------------------------------------------------------

  const onShowPanel = useCallback(() => {
    setOpenPicker(true);
  }, []);

  const onHidePanel = useCallback(() => {
    setOpenPicker(false);
  }, []);

  // ------------------------------------------------------------------------------------------

  const onEyeDropperClick = useCallback(() => {
    console.log("Eye dropper click");
  }, []);

  // Set the hex and hsv states/refs with updated data
  const setColor = (updatedHex: string, updatedHsv: Hsv) => {
    hexRef.current = updatedHex;
    hsvRef.current = updatedHsv;

    setHex(updatedHex);
    setHsv(updatedHsv);

    // onChange(updatedHex);
  };

  // Helper to set the color when HSV change
  const setColorFromHsv = (updatedHsv: Hsv) =>
    setColor(
      hsvToHex(updatedHsv.hue, updatedHsv.saturation, updatedHsv.value),
      updatedHsv,
    );

  const { hue, saturation, value } = hsv;

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
            <EyeDropper onClick={onEyeDropperClick} />

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

        </div>
      )}
    </div>
  );
}

export default ColorGradientPicker;
