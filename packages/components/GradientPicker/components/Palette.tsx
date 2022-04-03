import { DEFAULT_PALETTE_HEIGHT, DEFAULT_PALETTE_WIDTH } from "../constants";
import { PalletteProps } from "../types";
import { sortPalette } from "../utils";

const Palette = (props: PalletteProps) => {
  const { palette, degree } = props;

  const sortedPalette = sortPalette(palette);

  const linearGradientColors = `linear-gradient(
    ${degree}deg,
    ${sortedPalette
      .map(
        ({ alpha, offset, color: { red, green, blue } }) =>
          `rgb(${red}, ${green}, ${blue}, ${alpha}) ${offset * 100}%`,
      )
      .join(", ")}
  )`;

  return (
    <div
      style={{
        width: DEFAULT_PALETTE_WIDTH,
        height: DEFAULT_PALETTE_HEIGHT,
        marginTop: 8,
        backgroundImage: linearGradientColors,
      }}
    />
  );
};

export default Palette;
