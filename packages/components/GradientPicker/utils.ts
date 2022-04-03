import { Gradient, PalletteColor } from "./types";

const compare = (
  { offset: offset1 }: PalletteColor,
  { offset: offset2 }: PalletteColor,
) => offset1 - offset2;

export const sortPalette = (palette: PalletteColor[]) => {
  return palette.sort(compare);
};

export const getLinearGradientBackgroundCss = (gradient: Gradient) => {
  const sortedPalette = sortPalette(gradient.palette);
  const linearGradientColors = `linear-gradient(
    ${gradient.degree}deg,
    ${sortedPalette
      .map(
        ({ alpha, offset, color: { red, green, blue } }) =>
          `rgb(${red}, ${green}, ${blue}, ${alpha}) ${offset * 100}%`,
      )
      .join(", ")}
  )`;

  return linearGradientColors;
};

export const noop = () => undefined;
