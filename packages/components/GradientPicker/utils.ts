import { Gradient, Points } from "../../colorTypes";

const compare = (
  { offset: offset1 }: Points,
  { offset: offset2 }: Points,
) => offset1 - offset2;

export const sortPalette = (palette: Points[]) => {
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
