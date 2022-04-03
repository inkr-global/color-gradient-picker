import cn from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

import s from "./ColorGradientPicker.module.css";
import ColorPicker from "./components/ColorPicker";
import ColorTypeSelect from "./components/ColorTypeSelect";
import GradientPicker from "./components/GradientPicker";
import { PalletteColor } from "./components/GradientPicker/types";
import Input from "./components/Input";
import { DEFAULT_CLASS_NAME, DEFAULT_PALETTE } from "./constants";
import useCloseWhenClickOutside from "./hooks/useCloseWhenClickOutside";
import useCloseWhenPressEcs from "./hooks/useCloseWhenPressEcs";
import {
  ColorGradientPickerProps,
  GradientColor,
  VALUE_COLOR_TYPE,
} from "./types";
import { Hex } from "./utils/colorTypes";
import hexToRgb from "./utils/hexToRgb";
import rgbToHex from "./utils/rgbToHex";
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
    palette: DEFAULT_PALETTE,
  };
  const propColorType = valueProp?.type || VALUE_COLOR_TYPE.SOLID;

  // ------------------------------------------------------------------------------------------

  const [totalAlpha, setTotalAlpha] = useState<number>(propAlpha);

  const [hex, setHex] = useState<string>(propColorHex);

  // for gradient picker
  const [gradient, setGradient] = useState<GradientColor>(propGradient);
  const [activeStopId, setActiveStopId] = useState<number>();

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
  useEffect(() => {
    if (propColorType === VALUE_COLOR_TYPE.GRADIENT) {
      const [stopColor] = gradient.palette;
      const _color = stopColor.color;

      setHex(rgbToHex(_color.red, _color.green, _color.blue));
      setActiveStopId(stopColor.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propColorType]);

  // ------------------------------------------------------------------------------------------
  const handleSetGradientPalette = (_pallette: PalletteColor[]) => {
    const newGradient: GradientColor = {
      ...gradient,
      palette: _pallette,
    };

    setGradient(newGradient);

    onChange({
      ...valueProp,
      gradient: newGradient,
    });
  };

  const handleSetColor = (_updatedHex: Hex) => {
    setHex(_updatedHex);

    // gradient
    if (propColorType === VALUE_COLOR_TYPE.GRADIENT) {
      const activeIndex = gradient.palette.findIndex(
        (_p) => _p.id === activeStopId,
      );

      const _palette = gradient.palette;
      _palette[activeIndex].color = hexToRgb(_updatedHex);

      const newGradient: GradientColor = {
        ...gradient,
        palette: _palette,
      };

      setGradient(newGradient);

      onChange({
        ...valueProp,
        gradient: newGradient,
      });
    }

    // solid
    if (propColorType === VALUE_COLOR_TYPE.SOLID) {
      onChange({
        ...valueProp,
        hex: _updatedHex,
      });
    }
  };

  const handleSetColorType = (_type: VALUE_COLOR_TYPE) => {
    onChange({
      ...valueProp,
      type: _type,
    });
  };

  const handleSetTotalAlpha = (_alpha: number) => {
    setTotalAlpha(_alpha);

    onChange({
      ...valueProp,
      alpha: _alpha,
    });
  };

  // ------------------------------------------------------------------------------------------
  const _handleColorStopSelect = (_activeStopColor: PalletteColor) => {
    const _color = _activeStopColor.color;

    setHex(rgbToHex(_color.red, _color.green, _color.blue));
    setActiveStopId(_activeStopColor.id);
  };

  const _handleSetInternalAlpha = (_alpha: number) => {
    if (propColorType === VALUE_COLOR_TYPE.SOLID) handleSetTotalAlpha(_alpha);

    if (propColorType === VALUE_COLOR_TYPE.GRADIENT) {
      const activeIndex = gradient.palette.findIndex(
        (_p) => _p.id === activeStopId,
      );

      const _palette = gradient.palette;
      _palette[activeIndex].alpha = _alpha;

      const newGradient: GradientColor = {
        ...gradient,
        palette: _palette,
      };

      setGradient(newGradient);

      onChange({
        ...valueProp,
        gradient: newGradient,
      });
    }
  };

  const _handleSetGradientDegree = (_degree: number) => {
    const newGradient: GradientColor = {
      ...gradient,
      degree: _degree,
    };

    setGradient(newGradient);

    onChange({
      ...valueProp,
      gradient: newGradient,
    });
  };

  // ------------------------------------------------------------------------------------------

  const internalAlpha =
    propColorType === VALUE_COLOR_TYPE.SOLID
      ? totalAlpha
      : gradient.palette.find((_p) => _p.id === activeStopId)?.alpha || 100;

  return (
    <div
      ref={containerRef}
      className={cn(s.wrapper, classNamePrefix, className)}
    >
      <Input.Hex
        onInputFocus={onShowPanel}
        value={hex}
        onChange={handleSetColor}
        inputWidth={inputWidth}
        onInputBlur={onInputBlur}
        onKeyDown={onKeyDown}
        extraInput={
          <>
            <div className={s.input_vertical_divider} />
            <Input.Alpha
              isExtraComponent
              value={totalAlpha}
              onChange={handleSetTotalAlpha}
              inputWidth={45}
              onInputBlur={onInputBlur}
              onKeyDown={onKeyDown}
            />
          </>
        }
      />

      {isOpenPicker && (
        <div className={s.picking_panel}>
          <ColorTypeSelect
            value={propColorType}
            onChange={handleSetColorType}
          />

          {propColorType === VALUE_COLOR_TYPE.GRADIENT && (
            <GradientPicker
              palette={gradient.palette}
              degree={gradient.degree}
              onDegreeChange={_handleSetGradientDegree}
              onColorStopSelect={_handleColorStopSelect}
              onPaletteChange={handleSetGradientPalette}
            />
          )}

          <ColorPicker
            hex={hex}
            alpha={internalAlpha}
            type={propColorType}
            onAlphaChange={_handleSetInternalAlpha}
            onSetColor={handleSetColor}
            onSetColorType={handleSetColorType}
          />
        </div>
      )}
    </div>
  );
}

export default ColorGradientPicker;
