import cn from "clsx";
import { useCallback, useRef, useState } from "react";

import s from "./ColorGradientPicker.module.css";
import {
  ColorGradientPickerProps,
  ColorType,
} from "./ColorGradientPicker.types";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import ColorTypeSelect from "./components/ColorTypeSelect/ColorTypeSelect";
import {
  DEFAULT_DEGREE,
  DEFAULT_PALETTE,
} from "./components/GradientPicker/constants";
import GradientPicker from "./components/GradientPicker/GradientPicker";
import { ALPHA_VALUE, DEFAULT_HEX } from "./components/Input/constants";
import UserInput from "./components/UserInput/UserInput";
import useCloseWhenClickOutside from "./hooks/useCloseWhenClickOutside";
import useCloseWhenPressEcs from "./hooks/useCloseWhenPressEcs";
import { Alpha, Gradient, Hex } from "./types/color";
import sanitizeHex from "./utils/color/sanitizeHex";


const DEFAULT_CLASS_NAME = "cgp";

function ColorGradientPicker(props: ColorGradientPickerProps) {
  // ------------------------------------------------------------------------------------------
  const {
    classNamePrefix = DEFAULT_CLASS_NAME,
    className,
    color,
    onChange,
    onInputFocus,
    colorPickingPanelClassName,
    colorSelectType = "all",
    panelPlacement = "bottom-left",
    style,
    panelStyle,
    ...rest
  } = props;

  // ------------------------------------------------------------------------------------------3

  const solidColor = sanitizeHex(color?.solid || DEFAULT_HEX);
  const totalAlpha = color?.alpha || ALPHA_VALUE.MAX;
  const linearGradient = color?.gradient || {
    degree: DEFAULT_DEGREE,
    points: DEFAULT_PALETTE,
  };
  const propColorType = color?.type || "solid";

  // ------------------------------------------------------------------------------------------

  const [isOpenPicker, setOpenPicker] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // ------------------------------------------------------------------------------------------

  const handleInputFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setOpenPicker(true);

    if (typeof onInputFocus === "function") onInputFocus(e);
  };

  const onHidePicker = useCallback(() => {
    setOpenPicker(false);
  }, []);

  // ------------------------------------------------------------------------------------------

  useCloseWhenClickOutside(containerRef, onHidePicker);
  useCloseWhenPressEcs(onHidePicker);

  // ------------------------------------------------------------------------------------------
  const handleSolidColorChange = (_updatedHex: Hex) => {
    onChange({
      ...color,
      solid: _updatedHex,
    });
  };

  const handleTotalAlphaChange = (_alpha: Alpha) => {
    onChange({
      ...color,
      alpha: _alpha,
    });
  };

  const handleSetColorType = (_type: ColorType) => {
    onChange({
      ...color,
      type: _type,
    });
  };

  const handleLinearGradientChange = (_gradient: Gradient) => {
    onChange({
      ...color,
      gradient: _gradient,
    });
  };

  // ------------------------------------------------------------------------------------------

  return (
    <div
      ref={containerRef}
      className={cn(s.wrapper, classNamePrefix, className)}
      style={style}
    >
      <UserInput
        {...rest}
        onSolidColorChange={handleSolidColorChange}
        onAlphaChange={handleTotalAlphaChange}
        color={color}
        onInputFocus={handleInputFocus}
      />

      {isOpenPicker && (
        <div
          className={cn(s.picking_panel, s[panelPlacement], colorPickingPanelClassName)}
          style={panelStyle}
        >
          {colorSelectType === "all" && (
            <ColorTypeSelect
              value={propColorType}
              onChange={handleSetColorType}
            />
          )}

          {propColorType === "linear-gradient" && (
            <GradientPicker
              gradient={linearGradient}
              onLinearGradientChange={handleLinearGradientChange}
            />
          )}

          {propColorType === "solid" && (
            <ColorPicker
              hex={solidColor}
              alpha={totalAlpha}
              onAlphaChange={handleTotalAlphaChange}
              onColorChange={handleSolidColorChange}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ColorGradientPicker;
