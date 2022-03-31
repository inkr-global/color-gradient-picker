import cn from "clsx";
import { useCallback, useRef, useState } from "react";

import s from "./ColorGradientPicker.module.css";
import ColorPicker from "./components/ColorPicker";
import ColorTypeSelect from "./components/ColorTypeSelect";
import GradientPicker from "./components/GradientPicker";
import { PalletteColor } from "./components/GradientPicker/types";
import { noop } from "./components/GradientPicker/utils";
import Input from "./components/Input";
import { DEFAULT_CLASS_NAME } from "./constants";
import useCloseWhenClickOutside from "./hooks/useCloseWhenClickOutside";
import useCloseWhenPressEcs from "./hooks/useCloseWhenPressEcs";
import {
  ColorGradientPickerProps,
  GradientColor,
  VALUE_COLOR_TYPE,
} from "./types";
import { Hex } from "./utils/colorTypes";
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
  const propGradient = valueProp?.gradient || {
    degree: 90,
    palette: [
      {
        id: 1,
        offset: 0,
        color: "rgb(238, 241, 11)",
      },
      {
        id: 2,
        offset: 1.0,
        color: "rgb(126, 32, 207)",
      },
    ],
  };
  const propColorType = valueProp?.type || VALUE_COLOR_TYPE.SOLID;

  // ------------------------------------------------------------------------------------------

  const [alpha, setAlpha] = useState<number>(propAlpha);
  const [hex, setHex] = useState<string>(propColorHex);
  const [gradient, setGradient] = useState<GradientColor>(propGradient);

  const [isOpenPicker, setOpenPicker] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // ------------------------------------------------------------------------------------------

  const onShowPanel = useCallback(() => {
    setOpenPicker(true);
  }, []);

  const onHidePicker = useCallback(() => {
    setOpenPicker(false);
  }, []);

  // ------------------------------------------------------------------------------------------

  useCloseWhenClickOutside(containerRef, onHidePicker);
  useCloseWhenPressEcs(onHidePicker);

  // ------------------------------------------------------------------------------------------

  // Set the hex and hsv states/refs with updated data
  const onSetColor = (_updatedHex: Hex) => {
    setHex(_updatedHex);

    onChange({
      ...valueProp,
      hex: _updatedHex,
    });
  };

  const onSetColorType = (_type: VALUE_COLOR_TYPE) => {
    onChange({
      ...valueProp,
      type: _type,
    });
  };

  const onSetAlpha = (_alpha: number) => {
    setAlpha(_alpha);

    onChange({
      alpha: _alpha,
      hex,
    });
  };

  const onSetGradientPalette = (_pallette: PalletteColor[]) => {
    setGradient({
      ...gradient,
      palette: _pallette,
    });
  };

  // ------------------------------------------------------------------------------------------

  return (
    <div
      ref={containerRef}
      className={cn(s.wrapper, classNamePrefix, className)}
    >
      <Input.ColorHex
        onInputFocus={onShowPanel}
        value={hex}
        onChange={onSetColor}
        inputWidth={inputWidth}
        onInputBlur={onInputBlur}
        onKeyDown={onKeyDown}
        extraInput={
          <>
            <div className={s.input_vertical_divider} />
            <Input.Alpha
              isExtraComponent
              value={alpha}
              onChange={onSetAlpha}
              inputWidth={45}
              onInputBlur={onInputBlur}
              onKeyDown={onKeyDown}
            />
          </>
        }
      />

      {isOpenPicker && (
        <div className={s.picking_panel}>
          <ColorTypeSelect value={propColorType} onChange={onSetColorType} />

          <GradientPicker
            palette={gradient.palette}
            degree={gradient.degree}
            onColorStopSelect={noop}
            onPaletteChange={onSetGradientPalette}
          />

          <ColorPicker
            hex={hex}
            alpha={alpha}
            type={propColorType}
            onSetColor={onSetColor}
            onSetColorType={onSetColorType}
            onAlphaChange={onSetAlpha}
          />
        </div>
      )}
    </div>
  );
}

export default ColorGradientPicker;
