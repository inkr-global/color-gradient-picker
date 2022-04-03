import cn from "clsx";
import { useCallback, useRef, useState } from "react";

import s from "./ColorGradientPicker.module.css";
import ColorPicker from "./components/ColorPicker";
import ColorTypeSelect from "./components/ColorTypeSelect";
import GradientPicker from "./components/GradientPicker";
import {
  DEFAULT_DEGREE,
  DEFAULT_PALETTE,
} from "./components/GradientPicker/constants";
import { Gradient } from "./components/GradientPicker/types";
import { ALPHA_VALUE, DEFAULT_HEX } from "./components/Input/constants";
import UserInput from "./components/UserInput";
import { DEFAULT_CLASS_NAME } from "./constants";
import useCloseWhenClickOutside from "./hooks/useCloseWhenClickOutside";
import useCloseWhenPressEcs from "./hooks/useCloseWhenPressEcs";
import { COLOR_TYPE, ColorGradientPickerProps } from "./types";
import { Hex } from "./utils/colorTypes";
import sanitizeHex from "./utils/sanitizeHex";

function ColorGradientPicker(props: ColorGradientPickerProps) {
  // ------------------------------------------------------------------------------------------
  const {
    classNamePrefix = DEFAULT_CLASS_NAME,
    className,
    color,
    onChange,
    onInputFocus,
    ...rest
  } = props;

  // ------------------------------------------------------------------------------------------

  const solidColor = sanitizeHex(color?.solid || DEFAULT_HEX);
  const totalAlpha = color?.alpha || ALPHA_VALUE.MAX;
  const linearGradient = color?.gradient || {
    degree: DEFAULT_DEGREE,
    palette: DEFAULT_PALETTE,
  };
  const propColorType = color?.type || COLOR_TYPE.SOLID;

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

  const handleTotalAlphaChange = (_alpha: number) => {
    onChange({
      ...color,
      alpha: _alpha,
    });
  };

  const handleSetColorType = (_type: COLOR_TYPE) => {
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
    >
      <UserInput
        {...rest}
        onSolidColorChange={handleSolidColorChange}
        onAlphaChange={handleTotalAlphaChange}
        color={color}
        onInputFocus={handleInputFocus}
      />

      {isOpenPicker && (
        <div className={s.picking_panel}>
          <ColorTypeSelect
            value={propColorType}
            onChange={handleSetColorType}
          />

          {propColorType === COLOR_TYPE.LINEAR && (
            <GradientPicker
              gradient={linearGradient}
              onLinearGradientChange={handleLinearGradientChange}
            />
          )}

          {propColorType === COLOR_TYPE.SOLID && (
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
