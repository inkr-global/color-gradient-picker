import cn from "clsx";
import { CSSProperties, ForwardedRef, forwardRef, memo, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react";

import { ClosePanelWhenClickOutside } from "./components/ClosePanelWhenClickOutside/ClosePanelWhenClickOutside";
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
import { useColorPickerPanelDraggable } from "./hooks/useColorPickerPanelDraggable";
import s from "./styles/global.module.css";
// eslint-disable-next-line css-modules/no-unused-class
import placementStyle from "./styles/placement.module.css";
import { Alpha, Gradient, Hex } from "./types/color";
import {
  ColorGradientPickerColorType,
  ColorGradientPickerProps,
} from "./types/colorGradientPicker";
import { sanitizeHex } from "./utils/color/sanitizeHex";
import { getRandomString } from "./utils/common";


export const ColorGradientPicker = memo(forwardRef(function ColorGradientPicker({

  // ColorGradientPickerProps
  onChange,
  colorSelectType = "all",
  isDraggable,
  panelPlacement = "bottom-left",
  panelClassName,
  panelStyle,

  // UserInputProps
  color,
  hasAlphaInput,
  theme = "light",
  onEyeDropperOpenChanged,

  // ColorInputCoreProps
  className,
  style,

  ...rest

}: ColorGradientPickerProps, forwardedRef: ForwardedRef<HTMLDivElement>) {


  // ------------------------------------------------------------------------------------------

  const solidColor = sanitizeHex(
    color?.solid ||
    (theme === "dark" ? DEFAULT_HEX_DARK : DEFAULT_HEX_LIGHT),
  );

  const totalAlpha = color?.alpha ?? ALPHA_VALUE_RANGE.MAX;
  const linearGradient = color?.gradient ?? DEFAULT_GRADIENT;
  const propColorType = color?.type ?? DEFAULT_COLOR_TYPE;


  // ------------------------------------------------------------------------------------------

  const [isPickerOpen, setOpenPicker] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwardedRef, useCallback(() => containerRef.current as HTMLDivElement, []));


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

  const pickerStyle = useMemo((): CSSProperties => ({
    ...panelStyle,
    position: isDraggable ? "fixed" : undefined,
  }), [isDraggable, panelStyle]);


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
        onEyeDropperOpenChanged={onEyeDropperOpenChanged}
      />

      {isPickerOpen && (
        <div
          className={cn(
            s.picking_panel,
            placementStyle[panelPlacement],
            panelClassName,
          )}
          style={pickerStyle}
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
              onEyeDropperOpenChanged={onEyeDropperOpenChanged}
              onAlphaChange={handleTotalAlphaChange}
              onColorChange={handleSolidColorChange}
              theme={theme}
            />
          )}

        </div>
      )}

      {(isPickerOpen && !isDragging) && (
        <ClosePanelWhenClickOutside
          containerRef={containerRef}
          callback={onHidePanel}
        />
      )}

    </div>
  );

}));
