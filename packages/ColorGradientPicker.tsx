import cn from "clsx";
import { useCallback, useMemo, useRef, useState } from "react";

import { GradientPicker } from "./components/GradientPicker/GradientPicker";
import { PanelHeader } from "./components/PanelHeader/PanelHeader";
import { SolidColorPicker } from "./components/SolidColorPicker/SolidColorPicker";
import { UserInput } from "./components/UserInput/UserInput";
import {
  ALPHA_VALUE_RANGE,
  DEFAULT_COLOR_TYPE,
  DEFAULT_HEX_DARK,
  DEFAULT_HEX_LIGHT,
} from "./constants/colorInput";
import { DEFAULT_GRADIENT } from "./constants/gradientPicker";
import { useClosePanelWhenClickOutside } from "./hooks/useClosePanelWhenClickOutside";
import { useColorPickerPanelDraggable } from "./hooks/useColorPickerPanelDraggable";
import s from "./styles/global.module.css";
// eslint-disable-next-line css-modules/no-unused-class
import placementStyle from "./styles/placement.module.css";
import { Alpha, Gradient, Hex } from "./types/color";
import {
  ColorGradientPickerColorType,
  ColorGradientPickerProps,
} from "./types/colorGradientPicker";
import sanitizeHex from "./utils/color/sanitizeHex";
import { getRandomString } from "./utils/common";

function ColorGradientPicker(props: ColorGradientPickerProps) {
  const {
    className,
    color,
    onChange,
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

  // ------------------------------------------------------------------------------------------
  const solidColor = sanitizeHex(
    color?.solid || (theme === "dark" ? DEFAULT_HEX_DARK : DEFAULT_HEX_LIGHT),
  );
  const totalAlpha = color?.alpha || ALPHA_VALUE_RANGE.MAX;
  const linearGradient = color?.gradient || DEFAULT_GRADIENT;
  const propColorType = color?.type || DEFAULT_COLOR_TYPE;

  // ------------------------------------------------------------------------------------------

  const [isPickerOpen, setOpenPicker] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ------------------------------------------------------------------------------------------

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

  const handleSetColorType = (_type: ColorGradientPickerColorType) => {
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
        theme === "dark" ? s.wrapper_dark : s.wrapper_light, // apply dark/light theme here
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
        onColorPreviewClick={onShowPanel}
        theme={theme}
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
