import cn from "clsx";
import { useCallback, useMemo, useRef, useState } from "react";

import { GradientPicker } from "./components/GradientPicker/GradientPicker";
import { PanelHeader } from "./components/PanelHeader/PanelHeader";
import { SolidColorPicker } from "./components/SolidColorPicker/SolidColorPicker";
import { UserInput } from "./components/UserInput/UserInput";
import { ALPHA_VALUE_RANGE, DEFAULT_HEX } from "./constants/colorInput";
import { DEFAULT_DEGREE, DEFAULT_PALETTE } from "./constants/gradientPicker";
import { useClosePanelWhenClickOutside } from "./hooks/useClosePanelWhenClickOutside";
import { useColorPickerPanelDraggable } from "./hooks/useColorPickerPanelDraggable";
import s from "./styles/global.module.css";
// eslint-disable-next-line css-modules/no-unused-class
import placementStyle from "./styles/placement.module.css";
import { Alpha, Gradient, Hex } from "./types/color";
import {
  ColorGradientPickerProps,
  ComponentColorType,
} from "./types/colorGradientPicker";
import sanitizeHex from "./utils/color/sanitizeHex";
import { getRandomString } from "./utils/common";

function ColorGradientPicker(props: ColorGradientPickerProps) {
  const {
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
  const totalAlpha = color?.alpha || ALPHA_VALUE_RANGE.MAX;
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
  }, []);

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

  const { isDragging } = useColorPickerPanelDraggable({
    isDraggable: (isDraggable && isPickerOpen) || false,
    containerID: containerID || "",
    dragElementID: draggableID,
    isPickerOpen: isPickerOpen,
  });

  useClosePanelWhenClickOutside(containerRef, onHidePanel, isDragging);

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

  const handleSetColorType = (_type: ComponentColorType) => {
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
      className={cn(
        s.wrapper,
        theme === "dark" && s.wrapper_dark, // apply dark/light theme here
        className,
      )}
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
      />

      {isPickerOpen && (
        <div
          className={cn(
            s.picking_panel,
            placementStyle[panelPlacement],
            panelClassName,
          )}
          style={{
            ...panelStyle,
            position: isDraggable ? "fixed" : undefined,
          }}
          id={containerID}
        >
          <PanelHeader
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
