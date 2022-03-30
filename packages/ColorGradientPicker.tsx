import cn from "clsx";
import { useCallback, useRef, useState } from "react";

import s from "./ColorGradientPicker.module.css";
import ColorPicker from "./components/ColorPicker";
import Input from "./components/Input";
import { DEFAULT_CLASS_NAME } from "./constants";
import useCloseWhenClickOutside from "./hooks/useCloseWhenClickOutside";
import useCloseWhenPressEcs from "./hooks/useCloseWhenPressEcs";
import { ColorGradientPickerProps } from "./types";
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

  const [alpha, setAlpha] = useState<number>(propAlpha);
  const [hex, setHex] = useState<string>(propColorHex);

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
      hex: _updatedHex,
      alpha,
    });
  };

  const onSetAlpha = (_alpha: number) => {
    setAlpha(_alpha);

    onChange({
      alpha: _alpha,
      hex,
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
            <div className={s.vertical_divider} />
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
        <ColorPicker
          hex={hex}
          alpha={alpha}
          onSetColor={onSetColor}
          onAlphaChange={onSetAlpha}
        />
      )}
    </div>
  );
}

export default ColorGradientPicker;
