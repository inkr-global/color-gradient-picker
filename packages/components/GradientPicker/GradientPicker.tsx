import { useMemo, useState } from "react";

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

const getPaletteColor = (palette: PalletteColor[], id: number) => {
  const color = palette.find((color) => color.id === id) || palette[0];
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
    stopRemovalDrop = DEFAULT_STOP_REMOVAL_DROP,
    minStops = DEFAULT_MIN_STOPS,
    maxStops = DEFAULT_MAX_STOPS,
    onPaletteChange,
    onColorStopSelect = noop,
  } = props;

  const palette = mapIdToPalette(paletteProp);

  const [defaultActiveColor] = palette;
  const [activeColorId, setActiveColorId] = useState(defaultActiveColor.id);

  const limits = useMemo(() => {
    const min = -HALF_STOP_WIDTH;
    const max = DEFAULT_PALETTE_WIDTH - HALF_STOP_WIDTH;

    return {
      min,
      max,
      drop: stopRemovalDrop,
    };
  }, [stopRemovalDrop]);

  const handleColorAdd = (offset: number) => {
    if (palette.length >= maxStops) return;

    const { color } = getPaletteColor(palette, activeColorId);
    const entry = {
      id: nextColorId(palette),
      offset: offset / DEFAULT_PALETTE_WIDTH,
      color,
    };

    const updatedPalette = [...palette, entry];

    setActiveColorId(entry.id);
    handlePaletteChange(updatedPalette);
  };

  const handleColorDelete = (id: number) => {
    if (palette.length <= minStops) return;

    const updatedPalette = palette.filter((c) => c.id !== id);
    const activeId = updatedPalette.reduce(
      (a, x) => (x.offset < a.offset ? x : a),
      updatedPalette[0],
    ).id;

    setActiveColorId(activeId);
    handlePaletteChange(updatedPalette);
  };

  const onStopDragStart = (id: number) => {
    if (id !== activeColorId) {
      setActiveColorId(id);
      const color = palette.find((color) => color.id === id);

      if (color) onColorStopSelect(color);
    }
  };

  // const handleColorSelect = (color, opacity = 1) => {
  //   palette = palette.map((c) =>
  //     activeColorId === c.id
  //       ? {
  //           ...c,
  //           color,
  //           opacity,
  //         }
  //       : c,
  //   );

  //   handlePaletteChange(palette);
  // };

  const handlePaletteChange = (palette: PalletteColor[]) => {
    const sortedPalette = sortPalette(palette).map(
      ({ offset, id, ...rest }) => ({
        ...rest,
        id,
        offset: offset,
        active: id === activeColorId,
      }),
    );

    onPaletteChange(sortedPalette);
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
      <div className={s.gp}>
        <Palette degree={degree} palette={palette} />
        <ColorStopsHolder
          width={DEFAULT_PALETTE_WIDTH}
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
        />
      </div>
    </div>
  );
};

export default GradientPicker;
