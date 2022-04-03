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
import {
  LinearGradient,
} from "./components/GradientPicker/types";
import Input from "./components/Input";
import { ALPHA_VALUE } from "./components/Input/constants";
import { DEFAULT_CLASS_NAME } from "./constants";
import useCloseWhenClickOutside from "./hooks/useCloseWhenClickOutside";
import useCloseWhenPressEcs from "./hooks/useCloseWhenPressEcs";
import {
  ColorGradientPickerProps,
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

  const solidColor = sanitizeHex(valueProp?.solid || "#000");
  const totalAlpha = valueProp?.alpha || ALPHA_VALUE.MAX;
  const linearGradient = valueProp?.gradient || {
    degree: DEFAULT_DEGREE,
    palette: DEFAULT_PALETTE,
  };
  const propColorType = valueProp?.type || VALUE_COLOR_TYPE.SOLID;

  // ------------------------------------------------------------------------------------------

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
  const handleSolidColorChange = (_updatedHex: Hex) => {
    onChange({
      ...valueProp,
      solid: _updatedHex,
    });
  };

  const handleTotalAlphaChange = (_alpha: number) => {
    onChange({
      ...valueProp,
      alpha: _alpha,
    });
  };

  const handleSetColorType = (_type: VALUE_COLOR_TYPE) => {
    onChange({
      ...valueProp,
      type: _type,
    });
  };

  const handleLinearGradientChange = (_gradient: LinearGradient) => {
    onChange({
      ...valueProp,
      gradient: _gradient,
    });
  };

  return (
    <div
      ref={containerRef}
      className={cn(s.wrapper, classNamePrefix, className)}
    >
      <Input.Hex
        onInputFocus={onShowPanel}
        value={solidColor}
        onChange={handleSolidColorChange}
        inputWidth={inputWidth}
        onInputBlur={onInputBlur}
        onKeyDown={onKeyDown}
        extraInput={
          <>
            <div className={s.input_vertical_divider} />
            <Input.Alpha
              isExtraComponent
              value={totalAlpha}
              onChange={handleTotalAlphaChange}
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

          {propColorType === VALUE_COLOR_TYPE.LINEAR && (
            <GradientPicker
              gradient={linearGradient}
              onLinearGradientChange={handleLinearGradientChange}
            />
          )}

          {propColorType === VALUE_COLOR_TYPE.SOLID && (
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
