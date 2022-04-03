import { useMemo } from "react";

import { DEFAULT_PALETTE_HEIGHT, DEFAULT_PALETTE_WIDTH } from "../constants";
import { PalletteProps } from "../types";
import { sortPalette } from "../utils";

const generateGradientId = () => "" + Math.random().toString(36).slice(2, 9);

const Palette = (props: PalletteProps) => {
  const { palette } = props;

  const sortedPalette = sortPalette(palette);
  const gradientId = useMemo(generateGradientId, [palette.length]);

  return (
    <div
      style={{
        width: DEFAULT_PALETTE_WIDTH,
        height: DEFAULT_PALETTE_HEIGHT,
        marginTop: 8,
      }}
    >
      <svg width="100%" height="100%">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0.5" x2="1" y2="0.5">
            {sortedPalette.map(({ id, offset, color, alpha = 1 }) => (
              <stop
                key={id}
                offset={offset}
                style={{
                  stopColor: `rgb(${color.red}, ${color.green}, ${color.blue})`,
                  stopOpacity: alpha,
                }}
              />
            ))}
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#${gradientId})`}
        />
      </svg>
    </div>
  );
};

export default Palette;
