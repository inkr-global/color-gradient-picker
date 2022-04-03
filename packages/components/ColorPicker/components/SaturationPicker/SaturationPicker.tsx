import clsx from "clsx";
import React, { useCallback, useRef, useState } from "react";

import {
  getSaturationValueFromPosition,
  SaturationValue,
} from "../../../../utils/common";
import hsvToHex from "../../../../utils/hsvToHex";
import s from "./SaturationPicker.module.css";

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
