import { useMemo, useState } from "react";

import { Alpha, Point } from "../../types/color";
import hexToRgb from "../../utils/color/hexToRgb";
import rgbToHex from "../../utils/color/rgbToHex";
import { noop, sortPalettePoints } from "../../utils/common";
import ColorPicker from "../ColorPicker/ColorPicker";
import { ALPHA_DISPLAY_VALUE, ALPHA_VALUE } from "../Input/constants";
import { InputDegree } from "../Input/Input.Degree";
import ColorStopsHolder from "./components/ColorStopsHolder";
import Palette from "./components/Palette";
import {
  DEFAULT_MAX_STOPS,
  DEFAULT_MIN_STOPS,
  DEFAULT_PALETTE_WIDTH,
  DEFAULT_STOP_REMOVAL_DROP,
  HALF_STOP_WIDTH,
} from "./constants";
import s from "./styles/GradientPicker.module.css";
import { GradientPickerProps } from "./types";

// ------------------------------------------------------------------------------------------

const nextColorId = (palette: Point[]) => Math.max(...palette.map(({ id }, index) => id || index)) + 1;

const mapIdToPoints = (points: Point[]) => [...points].map((color, index) => ({
  ...color,
  id: color.id || index + 1,
}));

const mapPointsToStops = ({
  palette,
  activeId,
}: {
  palette: Point[];
  activeId: number;
}) => palette.map((color) => ({
  ...color,
  id: color.id,
  offset: DEFAULT_PALETTE_WIDTH * Number(color.offset) - HALF_STOP_WIDTH,
  isActive: color.id === activeId,
}));

const getPointsColor = (_points: Point[], _id: number) => {
  const color = _points.find((_color) => _color.id === _id) || _points[0];
  return {
    ...color,
    offset: Number(color.offset),
  };
};

// ------------------------------------------------------------------------------------------

const GradientPicker = (props: GradientPickerProps) => {
  const {
    gradient,
    onLinearGradientChange,
    stopRemovalDrop = DEFAULT_STOP_REMOVAL_DROP,
    minStops = DEFAULT_MIN_STOPS,
    maxStops = DEFAULT_MAX_STOPS,
  } = props;

  const { points: pointsProp, degree } = gradient;

  const points = mapIdToPoints(pointsProp);

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

  const onStopDragStart = (id: number) => {
    if (id !== activeColorId) {
      setActiveColorId(id);
    }
  };

  const handleGradientChange = (_points: Point[], _degree: number) => {
    const sortedPalette = sortPalettePoints([..._points]).map(
      ({ offset, id, ...rest }) => ({
        ...rest,
        id: id,
        offset: offset,
        active: id === activeColorId,
      }),
    );

    onLinearGradientChange({
      degree: _degree,
      points: sortedPalette,
    });
  };

  const handleColorAdd = (offset: number) => {
    if (points.length >= maxStops) return;

    const { red, green, blue } = getPointsColor(points, activeColorId);
    const newStop: Point = {
      id: nextColorId(points),
      offset: offset / DEFAULT_PALETTE_WIDTH,
      red: red,
      green: green,
      blue: blue,
      alpha: ALPHA_VALUE.MAX,
    };

    const updatedPalette = [...points, newStop];

    setActiveColorId(newStop.id!);
    handleGradientChange(updatedPalette, degree);
  };

  const handleColorDelete = (id: number) => {
    if (points.length <= minStops) return;

    const updatedPalette = points.filter((c) => c.id !== id);
    const activeId = updatedPalette.reduce(
      (a, x) => (x.offset < a.offset ? x : a),
      updatedPalette[0],
    ).id;

    setActiveColorId(activeId);
    handleGradientChange(updatedPalette, degree);
  };

  const handleStopPosChange = (id: number, offset: number) => {
    const updatedPoints = points.map((_points) => (id === _points.id ?
      {
        ..._points,
        offset: (offset + HALF_STOP_WIDTH) / DEFAULT_PALETTE_WIDTH,
      } :
      _points));

    handleGradientChange(updatedPoints, degree);
  };

  const handleDegreeChange = (_degree: number) => {
    handleGradientChange(pointsProp, _degree);
  };

  const handleStopAlphaChange = (_alpha: Alpha) => {
    const updatedPoints = points.map((_points) => (activeColorId === _points.id ?
      {
        ..._points,
        alpha: _alpha,
      } :
      _points));

    handleGradientChange(updatedPoints, degree);
  };

  const handleStopColorChange = (_updateHex: string) => {
    const updatedPoints: Point[] = points.map((_points) => (activeColorId === _points.id ?
      {
        ..._points,
        ...hexToRgb(_updateHex),
      } :
      _points));

    handleGradientChange(updatedPoints, degree);
  };

  // ------------------------------------------------------------------------------------------

  const stopsHolderDisabled = points.length >= maxStops;

  const activeColor = points.find((item) => item.id === activeColorId);
  const alpha = activeColor?.alpha || ALPHA_DISPLAY_VALUE.MAX;
  const { red, green, blue } = activeColor || {
    red: 0,
    green: 0,
    blue: 0,
  };

  // ------------------------------------------------------------------------------------------

  return (
    <>
      <div className={s.gp_wrap}>
        <InputDegree onChange={handleDegreeChange} value={degree} />
        <div>
          <Palette
            onAddColor={handleColorAdd}
            degree={degree}
            points={points}
            disabled={stopsHolderDisabled}
          />
          <ColorStopsHolder
            stops={mapPointsToStops({
              palette: points,
              activeId: activeColorId,
            })}
            limits={limits}
            onPosChange={handleStopPosChange}
            onDeleteColor={handleColorDelete}
            onDragStart={onStopDragStart}
            onDragEnd={noop}
          />
        </div>
      </div>

      <ColorPicker
        hex={rgbToHex(red, green, blue)}
        alpha={alpha}
        onAlphaChange={handleStopAlphaChange}
        onColorChange={handleStopColorChange}
      />
    </>
  );
};

export default GradientPicker;
