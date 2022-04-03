import { useMemo, useState } from "react";

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
  width,
}: {
  palette: PalletteColor[];
  activeId: number;
  width: number;
}) =>
  palette.map((color) => {
    return {
      ...color,
      id: color.id,
      offset: width * Number(color.offset) - HALF_STOP_WIDTH,
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
    palette: paletteProp,
    degree,
    onDegreeChange,
    onPaletteChange,
    onColorStopSelect,
    stopRemovalDrop = DEFAULT_STOP_REMOVAL_DROP,
    minStops = DEFAULT_MIN_STOPS,
    maxStops = DEFAULT_MAX_STOPS,
  } = props;

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

  const handlePaletteChange = (_palette: PalletteColor[]) => {
    const sortedPalette = sortPalette(_palette).map(
      ({ offset, id, ...rest }) => ({
        ...rest,
        id,
        offset: offset,
        active: id === activeColorId,
      }),
    );

    onPaletteChange(sortedPalette);
  };

  const handleColorAdd = (offset: number) => {
    if (palette.length >= maxStops) return;

    const { color } = getPaletteColor(palette, activeColorId);
    const entry: PalletteColor = {
      id: nextColorId(palette),
      offset: offset / DEFAULT_PALETTE_WIDTH,
      color,
      alpha: ALPHA_VALUE.MAX,
    };

    const updatedPalette = [...palette, entry];

    setActiveColorId(entry.id);
    handlePaletteChange(updatedPalette);
    onColorStopSelect(entry)
  };

  const handleColorDelete = (id: number) => {
    if (palette.length <= minStops) return;

    const updatedPalette = palette.filter((c) => c.id !== id);
    const activeId = updatedPalette.reduce(
      (a, x) => (x.offset < a.offset ? x : a),
      updatedPalette[0],
    ).id;

    setActiveColorId(activeId);
    onColorStopSelect(updatedPalette[0]);
    handlePaletteChange(updatedPalette);
  };

  const onStopDragStart = (id: number) => {
    if (id !== activeColorId) {
      setActiveColorId(id);
      const _palette = palette.find((_p) => _p.id === id);

      if (_palette) onColorStopSelect(_palette);
    }
  };


  const handleStopPosChange = (id: number, offset: number) => {
    const updatedPalette = palette.map((_p) =>
      id === _p.id
        ? {
            ..._p,
            offset: (offset + HALF_STOP_WIDTH) / DEFAULT_PALETTE_WIDTH,
          }
        : _p,
    );

    handlePaletteChange(updatedPalette);
  };

  const stopsHolderDisabled = palette.length >= maxStops;

  return (
    <div className={s.gp_wrap}>
      <Input.Degree onChange={onDegreeChange} value={degree} />
      <div>
        <Palette degree={degree} palette={palette} />
        <ColorStopsHolder
          disabled={stopsHolderDisabled}
          stops={mapPaletteToStops({
            palette,
            width: DEFAULT_PALETTE_WIDTH,
            activeId: activeColorId,
          })}
          limits={limits}
          onPosChange={handleStopPosChange}
          onAddColor={handleColorAdd}
          onDeleteColor={handleColorDelete}
          onDragStart={onStopDragStart}
          onDragEnd={noop} 
        />
      </div>
    </div>
  );
};

export default GradientPicker;
