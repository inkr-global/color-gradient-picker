import { Gradient } from "../../types";
import { PointsColor } from "./types";

const compare = (
  { offset: offset1 }: PointsColor,
  { offset: offset2 }: PointsColor,
) => offset1 - offset2;

export const sortPalette = (palette: PointsColor[]) => {
  return palette.sort(compare);
};

export const getLinearGradientBackgroundCss = (gradient: Gradient) => {
  const sortedPalette = sortPalette(gradient.points);
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
