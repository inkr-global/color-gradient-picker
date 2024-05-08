import clsx from "clsx";
import React, { CSSProperties, useCallback, useMemo, useRef, useState } from "react";

import { ALPHA_SYMBOL } from "../../../constants/colorInput";
import { Alpha } from "../../../types/color";
import { hexToRgb } from "../../../utils/color/utils";
import {
  getAlphaDisplayValueFromAlpha,
  getAlphaFromPosition,
} from "../../../utils/common";
import s from "../styles/AlphaSlider.module.css";


type AlphaSliderProps = {
  alpha: Alpha;
  hex: string;
  onChange: (alpha: Alpha) => void;
  className?: string;
};


export function AlphaSlider(props: AlphaSliderProps) {

  const { alpha, onChange, hex, className } = props;

  const [isInteracting, setIsInteracting] = useState(false);
  const sliderDivRef = useRef<HTMLDivElement>(null);


  // ------------------------------------------------------------------------------------------

  const updateAlpha = useCallback(
    (
      evt: React.MouseEvent<Element, MouseEvent> | React.PointerEvent<Element>,
    ) => {
      if (!sliderDivRef.current) {
        return;
      }

      const alphaPosition = sliderDivRef.current.getBoundingClientRect();

      const x = evt.clientX - alphaPosition.left;

      const updatedAlpha = getAlphaFromPosition(
        x,
        sliderDivRef.current.clientWidth,
      );

      onChange(updatedAlpha);
    },
    [onChange],
  );

  const onPointerDown = useCallback(
    (evt: React.PointerEvent<Element>): void => {
      (evt.target as HTMLElement).setPointerCapture(evt.pointerId);
      setIsInteracting(true);
      updateAlpha(evt);
    },
    [updateAlpha],
  );

  const onPointerUp = useCallback((evt: React.PointerEvent<Element>): void => {
    (evt.target as HTMLElement).releasePointerCapture(evt.pointerId);
    setIsInteracting(false);
  }, []);

  const onMouseDown = useCallback(
    (evt: React.MouseEvent<Element, MouseEvent>): void => {
      setIsInteracting(true);
      updateAlpha(evt);
    },
    [updateAlpha],
  );

  const onMove = useCallback(
    (
      evt: React.MouseEvent<Element, MouseEvent> | React.PointerEvent<Element>,
    ): void => {
      if (isInteracting) {
        updateAlpha(evt);
      }
    },
    [isInteracting, updateAlpha],
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

  const sliderStyle: CSSProperties = useMemo(() => ({
    left: getAlphaDisplayValueFromAlpha(alpha, ALPHA_SYMBOL),
    backgroundColor: hex,
  }), [alpha, hex]);

  const { red, green, blue } = hexToRgb(hex);

  const alphaStyle: CSSProperties = {
    background: `linear-gradient(to right, rgba(${red}, ${green}, ${blue}, 0) 0%, ${hex} 100%)`,
  };

  return (
    <div
      className={clsx(s.alpha_slider, className)}
      ref={sliderDivRef}
      title="Alpha"
      {...interactionCallbacks}
    >
      <div
        className={s.alpha_slider_bg}
        style={alphaStyle}
      />
      <div
        className={clsx(s.alpha_slider_picker)}
        style={sliderStyle}
      />
    </div>
  );
}
