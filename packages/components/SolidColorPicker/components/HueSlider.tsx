import clsx from "clsx";
import React, { useCallback, useRef, useState } from "react";

import hsvToHex from "../../../utils/color/hsvToHex";
import { getHueFromPosition } from "../../../utils/common";
import s from "../styles/HueSlider.module.css";



type HueSliderProps = {
  hue: number;
  onChange: (hue: number) => void;
  className?: string;
};

const HueSlider = (props: HueSliderProps) => {
  // ------------------------------------------------------------------------------------------
  const { hue, onChange, className } = props;

  // ------------------------------------------------------------------------------------------
  const [isInteracting, setIsInteracting] = useState(false);
  const sliderDivRef = useRef<HTMLDivElement>(null);

  const hueColor = hsvToHex(hue, 1, 1);

  // ------------------------------------------------------------------------------------------
  const updateHue = useCallback(
    (
      evt: React.MouseEvent<Element, MouseEvent> | React.PointerEvent<Element>,
    ) => {
      if (!sliderDivRef.current) {
        return;
      }

      const huePosition = sliderDivRef.current.getBoundingClientRect();

      const x = evt.clientX - huePosition.left;
      const updatedHue = getHueFromPosition(
        x,
        sliderDivRef.current.clientWidth,
      );
      onChange(updatedHue);
    },
    [onChange],
  );

  const onPointerDown = useCallback(
    (evt: React.PointerEvent<Element>): void => {
      (evt.target as HTMLElement).setPointerCapture(evt.pointerId);
      setIsInteracting(true);
      updateHue(evt);
    },
    [updateHue],
  );

  const onPointerUp = useCallback((evt: React.PointerEvent<Element>): void => {
    (evt.target as HTMLElement).releasePointerCapture(evt.pointerId);
    setIsInteracting(false);
  }, []);

  const onMouseDown = useCallback(
    (evt: React.MouseEvent<Element, MouseEvent>): void => {
      setIsInteracting(true);
      updateHue(evt);
    },
    [updateHue],
  );

  const onMove = useCallback(
    (
      evt: React.MouseEvent<Element, MouseEvent> | React.PointerEvent<Element>,
    ): void => {
      if (isInteracting) {
        updateHue(evt);
      }
    },
    [isInteracting, updateHue],
  );

  const onMouseUp = useCallback(() => {
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

  const sliderStyle = {
    left: `${(hue / 360) * 100}%`,
    backgroundColor: hueColor,
  };

  return (
    <div
      className={clsx(s.hue_slider, className)}
      ref={sliderDivRef}
      title="Hue"
      {...interactionCallbacks}
    >
      <div className={clsx(s.hue_slider_picker)} style={sliderStyle} />
    </div>
  );
};

export default HueSlider;
