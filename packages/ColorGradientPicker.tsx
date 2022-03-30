import cn from "clsx";
import { useCallback, useEffect, useRef, useState } from "react";

import s from "./ColorGradientPicker.module.css";
import ColorPicker from "./components/ColorPicker";
import Input from "./components/Input";
import { DEFAULT_CLASS_NAME } from "./constants";
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
