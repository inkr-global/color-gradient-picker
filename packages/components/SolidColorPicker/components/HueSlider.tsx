import clsx from "clsx";
import React, { CSSProperties, useCallback, useMemo, useRef, useState } from "react";

import { hsvToHex } from "../../../utils/color/utils";
import { getHueFromPosition } from "../../../utils/common";
import s from "../styles/HueSlider.module.css";


type HueSliderProps = {
  hue: number;
  onChange: (hue: number) => void;
  className?: string;
};

export function HueSlider(props: HueSliderProps) {
  const { hue, onChange, className } = props;

  // ------------------------------------------------------------------------------------------
  const [isInteracting, setIsInteracting] = useState(false);
  const sliderDivRef = useRef<HTMLDivElement>(null);

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
  const interactionCallbacks = window.PointerEvent ?
    {
      onPointerDown: onPointerDown,
      onPointerMove: onMove,
      onPointerUp: onPointerUp,
    } :
    {
      onMouseDown: onMouseDown,
      onMouseMove: onMove,
      onMouseUp: onMouseUp,
    };

  const sliderStyle = useMemo((): CSSProperties => ({
    left: `${(hue / 360) * 100}%`,
    backgroundColor: hsvToHex({
      hue: hue,
      saturation: 1,
      value: 1,
    }),
  }), [hue]);

  return (
    <div
      className={clsx(s.hue_slider, className)}
      ref={sliderDivRef}
      title="Hue"
      {...interactionCallbacks}
    >

      <div
        className={clsx(s.hue_slider_picker)}
        style={sliderStyle}
      />

    </div>
  );

}
