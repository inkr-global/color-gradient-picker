import { useMemo, useState } from "react";

import hexToRgb from "../../utils/hexToRgb";
import rgbToHex from "../../utils/rgbToHex";
import ColorPicker from "../ColorPicker";
import Input from "../Input";
import { ALPHA_VALUE } from "../Input/constants";
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
import { GradientPickerProps, PalletteColor } from "./types";
import { noop, sortPalette } from "./utils";

// ------------------------------------------------------------------------------------------

const nextColorId = (palette: PalletteColor[]) =>
  Math.max(...palette.map(({ id }) => id)) + 1;

const mapIdToPalette = (palette: PalletteColor[]) =>
  palette.map((color, index) => ({
    ...color,
    id: color.id || index + 1,
  }));

const mapPaletteToStops = ({
  palette,
  activeId,
}: {
  palette: PalletteColor[];
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

const getPaletteColor = (_palette: PalletteColor[], _id: number) => {
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

  const { palette: paletteProp, degree } = gradient;

  const palette = mapIdToPalette(paletteProp);

  // ------------------------------------------------------------------------------------------
  const [defaultActiveColor] = palette;
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

  const handleGradientChange = (_palette: PalletteColor[], _degree: number) => {
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
      palette: sortedPalette,
    });
  };

  const handleColorAdd = (offset: number) => {
    if (palette.length >= maxStops) return;

    const { color } = getPaletteColor(palette, activeColorId);
    const newStop: PalletteColor = {
      id: nextColorId(palette),
      offset: offset / DEFAULT_PALETTE_WIDTH,
      color,
      alpha: ALPHA_VALUE.MAX,
    };

    const updatedPalette = [...palette, newStop];

    setActiveColorId(newStop.id);
    handleGradientChange(updatedPalette, degree);
  };

  const handleColorDelete = (id: number) => {
    if (palette.length <= minStops) return;

    const updatedPalette = palette.filter((c) => c.id !== id);
    const activeId = updatedPalette.reduce(
      (a, x) => (x.offset < a.offset ? x : a),
      updatedPalette[0],
    ).id;

    setActiveColorId(activeId);
    handleGradientChange(updatedPalette, degree);
  };

  const handleStopPosChange = (id: number, offset: number) => {
    const updatedPalette = palette.map((_palette) =>
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
    handleGradientChange(paletteProp, _degree);
  };

  const handleStopAlphaChange = (_alpha: number) => {
    const updatedPalette = palette.map((_palette) =>
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
    const updatedPalette = palette.map((_palette) =>
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

  const stopsHolderDisabled = palette.length >= maxStops;

  const activeColor = palette.find((item) => item.id === activeColorId);
  const alpha = activeColor?.alpha || ALPHA_VALUE.MAX;
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
            palette={palette}
            disabled={stopsHolderDisabled}
          />
          <ColorStopsHolder
            stops={mapPaletteToStops({
              palette,
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
