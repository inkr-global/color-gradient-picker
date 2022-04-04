import clsx from "clsx";
import React, { useCallback, useRef, useState } from "react";

import hsvToHex from "../../../../color-utils/hsvToHex";
import { SaturationValue } from "../../../../colorTypes";
import s from "./SaturationPicker.module.css";

/**
 * Get the saturation and value from a given position on the SV slider
 * @param {number} x The x coordinate on the SV selector
 * @param {number} y The y coordinate on the SV selector
 * @param {number} width The width of the SV selector
 * @param {number} height The height of the SV selector
 * @returns {SaturationValue} The saturation and value based on the position
 */
 function getSaturationValueFromPosition(
  x: number,
  y: number,
  width: number,
  height: number,
): SaturationValue {
  const percentageX = !width ? 0 : x / width;
  const percentageY = !height ? 0 : 1 - y / height;

  const saturation = Math.max(Math.min(percentageX, 1), 0);
  const value = Math.max(Math.min(percentageY, 1), 0);

  return {
    saturation,
    value,
  };
}


type SaturationPickerProps = {
  hue: number;
  saturation: number;
  value: number;

  onChange: (saturationValue: SaturationValue) => void;
};

const SaturationPicker = (props: SaturationPickerProps) => {
  // ------------------------------------------------------------------------------------------
  const { hue, saturation, value, onChange } = props;

  // ------------------------------------------------------------------------------------------
  const [isInteracting, setIsInteracting] = useState(false);
  const selectorDivRef = useRef<HTMLDivElement>(null);

  const hueColor = hsvToHex(hue, 1, 1);
  const hex = hsvToHex(hue, saturation, value);

  const updateSaturationValue = useCallback(
    (
      evt: React.MouseEvent<Element, MouseEvent> | React.PointerEvent<Element>,
    ) => {
      if (!selectorDivRef.current) {
        return;
      }

      const svPosition = selectorDivRef.current.getBoundingClientRect();
      const x = evt.clientX - svPosition.left;
      const y = evt.clientY - svPosition.top;

      const updatedSaturationValue = getSaturationValueFromPosition(
        x,
        y,
        selectorDivRef.current.clientWidth,
        selectorDivRef.current.clientHeight,
      );

      onChange(updatedSaturationValue);
    },
    [onChange],
  );

  const onPointerDown = useCallback(
    (evt: React.PointerEvent<Element>): void => {
      (evt.target as HTMLElement).setPointerCapture(evt.pointerId);
      setIsInteracting(true);
      updateSaturationValue(evt);
    },
    [updateSaturationValue],
  );

  const onPointerUp = useCallback((evt: React.PointerEvent<Element>): void => {
    (evt.target as HTMLElement).releasePointerCapture(evt.pointerId);
    setIsInteracting(false);
  }, []);

  const onMouseDown = useCallback(
    (evt: React.MouseEvent<Element, MouseEvent>): void => {
      setIsInteracting(true);
      updateSaturationValue(evt);
    },
    [updateSaturationValue],
  );

  const onMove = useCallback(
    (
      evt: React.MouseEvent<Element, MouseEvent> | React.PointerEvent<Element>,
    ): void => {
      if (isInteracting) {
        updateSaturationValue(evt);
      }
    },
    [isInteracting, updateSaturationValue],
  );

  const onMouseUp = useCallback((): void => {
    setIsInteracting(false);
  }, []);

  // Setup pointer events for supported browsers for two reasons:
  //   1. It allows for pointer capture which allows for continued
  //      interaction even when the cursor/pointer outside of picker
  //   2. It allows for unified code across devices (mobile and desktop)
  const interactionCallbacks = window.PointerEvent
    ? {
        onPointerDown,
        onPointerMove: onMove,
        onPointerUp,
      }
    : {
        onMouseDown,
        onMouseMove: onMove,
        onMouseUp,
      };

  return (
    <div
      className={clsx(s.saturation_value_selector)}
      style={{
        backgroundColor: hueColor,
      }}
      ref={selectorDivRef}
      title="Saturation and Value"
      {...interactionCallbacks}
    >
      <div
        className={clsx(s.saturation_value_picker)}
        style={{
          left: `${saturation * 100}%`,
          top: `${(1 - value) * 100}%`,
          backgroundColor: hex,
        }}
      />
    </div>
  );
};

export default SaturationPicker;
