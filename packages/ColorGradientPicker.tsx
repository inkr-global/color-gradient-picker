import cn from "clsx";
import { useCallback, useMemo, useRef, useState } from "react";

import s from "./ColorGradientPicker.module.css";
import {
  ColorGradientPickerProps,
  ColorType,
} from "./ColorGradientPicker.types";
import ColorTypeSelect from "./components/ColorTypeSelect/ColorTypeSelect";
import {
  DEFAULT_DEGREE,
  DEFAULT_PALETTE,
} from "./components/GradientPicker/constants";
import GradientPicker from "./components/GradientPicker/GradientPicker";
import { ALPHA_VALUE, DEFAULT_HEX } from "./components/Input/constants";
import SolidColorPicker from "./components/SolidColorPicker/SolidColorPicker";
import UserInput from "./components/UserInput/UserInput";
import useCloseWhenClickOutside from "./hooks/useCloseWhenClickOutside";
import { useDraggable } from "./hooks/useDraggable";
import { Alpha, Gradient, Hex } from "./types/color";
import sanitizeHex from "./utils/color/sanitizeHex";
import { getRandomString } from "./utils/common";

const DEFAULT_CLASS_NAME = "cgp";

function ColorGradientPicker(props: ColorGradientPickerProps) {
  // ------------------------------------------------------------------------------------------
  const {
    classNamePrefix = DEFAULT_CLASS_NAME,
    className,
    color,
    onChange,
    onInputFocus,
    panelClassName,
    colorSelectType = "all",
    panelPlacement = "bottom-left",
    style,
    panelStyle,
    hasAlphaInput,
    isDraggable,
    theme = "light",
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

  const [isPickerOpen, setOpenPicker] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // ------------------------------------------------------------------------------------------

  const handleInputFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setOpenPicker(true);

    if (typeof onInputFocus === "function") onInputFocus(e);
  };

  const onShowPanel = useCallback(() => {
    setOpenPicker(true);
  }, [])

  const onHidePanel = useCallback(() => {
    setOpenPicker(false);
  }, []);

  // ------------------------------------------------------------------------------------------

  const [containerID, draggableID] = useMemo(() => {
    if (!isDraggable) return [undefined, undefined];

    const _containerID = getRandomString();
    const _draggableID = getRandomString();

    return [_containerID, _draggableID];
  }, [isDraggable]);

  const { isDragging } = useDraggable({
    isDraggable: (isDraggable && isPickerOpen) || false,
    containerID: containerID || "",
    dragElementID: draggableID,
    isPickerOpen: isPickerOpen,
  });

  useCloseWhenClickOutside(containerRef, onHidePanel, isDragging);

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
      className={cn(s.wrapper, theme === "light" ? s.wrapper_light : s.wrapper_dark, classNamePrefix, className)}
      style={style}
    >
      <UserInput
        {...rest}
        hasAlphaInput={hasAlphaInput}
        onSolidColorChange={handleSolidColorChange}
        onAlphaChange={handleTotalAlphaChange}
        color={color}
        onInputFocus={handleInputFocus}
        onColorPreviewClick={onShowPanel}
        theme={theme}
      />

      {isPickerOpen && (
        <div
          className={cn(s.picking_panel, theme === "light" ? s.color_light : s.color_dark, s[panelPlacement], panelClassName)}
          style={{
            ...panelStyle,
            position: isDraggable ? "fixed" : undefined,
          }}
          id={containerID}
        >
          <ColorTypeSelect
            value={propColorType}
            onChange={handleSetColorType}
            colorSelectType={colorSelectType}
            onClosePanel={onHidePanel}
            draggableID={draggableID}
            theme={theme}
          />

          {propColorType === "linear-gradient" && (
            <GradientPicker
              gradient={linearGradient}
              onLinearGradientChange={handleLinearGradientChange}
              theme={theme}
            />
          )}

          {propColorType === "solid" && (
            <SolidColorPicker
              hasAlphaInput={hasAlphaInput}
              hex={solidColor}
              alpha={totalAlpha}
              onAlphaChange={handleTotalAlphaChange}
              onColorChange={handleSolidColorChange}
              theme={theme}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ColorGradientPicker;
