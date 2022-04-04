import { useMemo, useState } from "react";

import hexToRgb from "../../utils/hexToRgb";
import rgbToHex from "../../utils/rgbToHex";
import ColorPicker from "../ColorPicker";
import Input from "../Input";
import { ALPHA_DISPLAY_VALUE, ALPHA_VALUE } from "../Input/constants";
import ColorStopsHolder from "./components/ColorStopsHolder";
import Palette from "./components/Palette";
import {
  DEFAULT_MAX_STOPS,
  DEFAULT_MIN_STOPS,
  DEFAULT_PALETTE_WIDTH,
  DEFAULT_STOP_REMOVAL_DROP,
  HALF_STOP_WIDTH,
} from "./constants";
import s from "./GradientPicker.module.css";
import { GradientPickerProps, PointsColor } from "./types";
import { noop, sortPalette } from "./utils";

// ------------------------------------------------------------------------------------------

const nextColorId = (palette: PointsColor[]) =>
  Math.max(...palette.map(({ id }) => id)) + 1;

const mapIdToPoints = (points: PointsColor[]) =>
  points.map((color, index) => ({
    ...color,
    id: color.id || index + 1,
  }));

const mapPointsToStops = ({
  palette,
  activeId,
}: {
  palette: PointsColor[];
  activeId: number;
}) =>
  palette.map((color) => {
    return {
      ...color,
      id: color.id,
      offset: DEFAULT_PALETTE_WIDTH * Number(color.offset) - HALF_STOP_WIDTH,
      isActive: color.id === activeId,
    };
  });

const getPointsColor = (_palette: PointsColor[], _id: number) => {
  const color = _palette.find((_color) => _color.id === _id) || _palette[0];
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
      min,
      max,
      drop: stopRemovalDrop,
    };
  }, [stopRemovalDrop]);

  // ------------------------------------------------------------------------------------------

  const onStopDragStart = (id: number) => {
    if (id !== activeColorId) {
      setActiveColorId(id);
    }
  };

  const handleGradientChange = (_palette: PointsColor[], _degree: number) => {
    const sortedPalette = sortPalette(_palette).map(
      ({ offset, id, ...rest }) => ({
        ...rest,
        id,
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

    const { color } = getPointsColor(points, activeColorId);
    const newStop: PointsColor = {
      id: nextColorId(points),
      offset: offset / DEFAULT_PALETTE_WIDTH,
      color,
      alpha: ALPHA_VALUE.MAX,
    };

    const updatedPalette = [...points, newStop];

    setActiveColorId(newStop.id);
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
    const updatedPalette = points.map((_palette) =>
      id === _palette.id
        ? {
            ..._palette,
            offset: (offset + HALF_STOP_WIDTH) / DEFAULT_PALETTE_WIDTH,
          }
        : _palette,
    );

    handleGradientChange(updatedPalette, degree);
  };

  const handleDegreeChange = (_degree: number) => {
    handleGradientChange(pointsProp, _degree);
  };

  const handleStopAlphaChange = (_alpha: number) => {
    const updatedPalette = points.map((_palette) =>
      activeColorId === _palette.id
        ? {
            ..._palette,
            alpha: _alpha,
          }
        : _palette,
    );

    handleGradientChange(updatedPalette, degree);
  };

  const handleStopColorChange = (_updateHex: string) => {
    const updatedPalette = points.map((_palette) =>
      activeColorId === _palette.id
        ? {
            ..._palette,
            color: hexToRgb(_updateHex),
          }
        : _palette,
    );

    handleGradientChange(updatedPalette, degree);
  };

  // ------------------------------------------------------------------------------------------

  const stopsHolderDisabled = points.length >= maxStops;

  const activeColor = points.find((item) => item.id === activeColorId);
  const alpha = activeColor?.alpha || ALPHA_DISPLAY_VALUE.MAX;
  const { red, green, blue } = activeColor?.color || {
    red: 0,
    green: 0,
    blue: 0,
  };

  // ------------------------------------------------------------------------------------------

  return (
    <>
      <div className={s.gp_wrap}>
        <Input.Degree onChange={handleDegreeChange} value={degree} />
        <div>
          <Palette
            onAddColor={handleColorAdd}
            degree={degree}
            palette={points}
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
