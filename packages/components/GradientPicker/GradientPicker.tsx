import { memo, useCallback, useMemo, useState } from "react";

import {
  ALPHA_DISPLAY_VALUE_RANGE,
  ALPHA_VALUE_RANGE,
} from "../../constants/colorInput";
import {
  DEFAULT_MAX_STOPS,
  DEFAULT_MIN_STOPS,
  DEFAULT_PALETTE_WIDTH,
  DEFAULT_STOP_REMOVAL_DROP,
  HALF_STOP_WIDTH,
} from "../../constants/gradientPicker";
import { Alpha, Point } from "../../types/color";
import { GradientPickerProps } from "../../types/gradientPicker";
import { hexToRgb, rgbToHex } from "../../utils/color/utils";
import { sortPalettePoints } from "../../utils/common";
import { ColorInputDegree } from "../ColorInput/ColorInput.Degree";
import { SolidColorPicker } from "../SolidColorPicker/SolidColorPicker";
import { ColorStopsHolder } from "./components/ColorStopsHolder";
import { Palette } from "./components/Palette";
import s from "./styles/GradientPicker.module.css";


// ------------------------------------------------------------------------------------------

function nextColorId(palette: Point[]) {
  return Math.max(...palette.map(({ id }, index) => id || index)) + 1;
}

function mapIdToPoints(points: Point[]) {
  return [...points]
    .map((color, index) => ({
      ...color,
      id: color.id || index + 1,
    }));
}

function mapPointsToStops({
  palette,
  activeId,
}: {
  palette: Point[];
  activeId: number;
}) {
  return palette.map((color) => ({
    ...color,
    id: color.id,
    offset: DEFAULT_PALETTE_WIDTH * Number(color.offset) - HALF_STOP_WIDTH,
    isActive: color.id === activeId,
  }));
}

function getPointsColor(_points: Point[], _id: number) {
  const color = _points.find((_color) => _color.id === _id) || _points[0];
  return {
    ...color,
    offset: Number(color.offset),
  };
}


// ------------------------------------------------------------------------------------------

export const GradientPicker = memo(function GradientPicker({
  gradient,
  onLinearGradientChange,
  stopRemovalDrop = DEFAULT_STOP_REMOVAL_DROP,
  minStops = DEFAULT_MIN_STOPS,
  maxStops = DEFAULT_MAX_STOPS,
  theme,
}: GradientPickerProps) {


  const {
    points: pointsProp,
    degree,
  } = gradient;

  const points = useMemo(() => (
    mapIdToPoints(pointsProp)
  ), [pointsProp]);


  // ------------------------------------------------------------------------------------------

  const [defaultActiveColor] = points;

  const [activeColorId, setActiveColorId] = useState(defaultActiveColor.id);


  // ------------------------------------------------------------------------------------------

  const limits = useMemo(() => {

    const min = -HALF_STOP_WIDTH;
    const max = DEFAULT_PALETTE_WIDTH - HALF_STOP_WIDTH;

    return {
      min: min,
      max: max,
      drop: stopRemovalDrop,
    };

  }, [stopRemovalDrop]);


  // ------------------------------------------------------------------------------------------

  const handleStopDragStart = useCallback((id: number) => {
    if (id !== activeColorId) {
      setActiveColorId(id);
    }
  }, [activeColorId]);


  const handleGradientChange = useCallback((_points: Point[], _degree: number) => {

    const sortedPalette = sortPalettePoints([..._points])
      .map(({ offset, id, ...rest }) => ({
        ...rest,
        id: id,
        offset: offset,
        active: id === activeColorId,
      }));

    onLinearGradientChange({
      degree: _degree,
      points: sortedPalette,
    });

  }, [activeColorId, onLinearGradientChange]);


  const handleColorAdd = useCallback((offset: number) => {

    if (points.length >= maxStops) return;

    const { red, green, blue } = getPointsColor(points, activeColorId);
    const newStop: Point = {
      id: nextColorId(points),
      offset: offset / DEFAULT_PALETTE_WIDTH,
      red: red,
      green: green,
      blue: blue,
      alpha: ALPHA_VALUE_RANGE.MAX,
    };

    const updatedPalette = [...points, newStop];

    if (typeof newStop.id === "number") {
      setActiveColorId(newStop.id);
    }

    handleGradientChange(updatedPalette, degree);

  }, [activeColorId, degree, handleGradientChange, maxStops, points]);


  const handleColorDelete = useCallback((id: number) => {

    if (points.length <= minStops) return;

    const updatedPalette = points.filter((c) => c.id !== id);
    const activeId = updatedPalette.reduce(
      (a, x) => (x.offset < a.offset ? x : a),
      updatedPalette[0],
    ).id;

    setActiveColorId(activeId);
    handleGradientChange(updatedPalette, degree);

  }, [degree, handleGradientChange, minStops, points]);


  const handleStopPosChange = useCallback((id: number, offset: number) => {

    const updatedPoints = points.map((_points) => (
      id === _points.id ?
        {
          ..._points,
          offset: (offset + HALF_STOP_WIDTH) / DEFAULT_PALETTE_WIDTH,
        } :
        _points
    ));

    handleGradientChange(updatedPoints, degree);

  }, [degree, handleGradientChange, points]);


  const handleDegreeChange = useCallback((_degree: number) => {
    handleGradientChange(pointsProp, _degree);
  }, [handleGradientChange, pointsProp]);


  const handleStopAlphaChange = useCallback((_alpha: Alpha) => {

    const updatedPoints = points.map((_points) => (
      activeColorId === _points.id ?
        {
          ..._points,
          alpha: _alpha,
        } :
        _points
    ));

    handleGradientChange(updatedPoints, degree);

  }, [activeColorId, degree, handleGradientChange, points]);


  const handleStopColorChange = useCallback((_updateHex: string) => {

    const updatedPoints: Point[] = points.map((_points) => (
      activeColorId === _points.id ?
        {
          ..._points,
          ...hexToRgb(_updateHex),
        } :
        _points
    ));

    handleGradientChange(updatedPoints, degree);

  }, [activeColorId, degree, handleGradientChange, points]);


  // ------------------------------------------------------------------------------------------

  const stopsHolderDisabled = points.length >= maxStops;

  const activeColor = useMemo(() => (
    points.find((item) => item.id === activeColorId)
  ), [activeColorId, points]);

  const alpha = activeColor?.alpha ?? ALPHA_DISPLAY_VALUE_RANGE.MAX;

  const {
    red,
    green,
    blue,
  } = activeColor || {
    red: 0,
    green: 0,
    blue: 0,
  };


  // ------------------------------------------------------------------------------------------

  return (
    <>
      <div className={s.gradient_picker}>

        <div>

          <Palette
            onAddColor={handleColorAdd}
            degree={degree}
            points={points}
            disabled={stopsHolderDisabled}
          />

          <ColorStopsHolder
            stops={useMemo(() => (
              mapPointsToStops({
                palette: points,
                activeId: activeColorId,
              })
            ), [activeColorId, points])}
            limits={limits}
            onPosChange={handleStopPosChange}
            onDeleteColor={handleColorDelete}
            onDragStart={handleStopDragStart}
          />

        </div>

        <ColorInputDegree
          onChange={handleDegreeChange}
          value={degree}
          theme={theme}
        />

      </div>

      <SolidColorPicker
        hex={useMemo(() => (
          rgbToHex({
            red: red,
            green: green,
            blue: blue,
          })
        ), [blue, green, red])}
        alpha={alpha}
        onAlphaChange={handleStopAlphaChange}
        onColorChange={handleStopColorChange}
        theme={theme}
      />

    </>
  );

});
