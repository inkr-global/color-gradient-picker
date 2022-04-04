import { Gradient, Points } from "../../colorTypes";

const compare = (
  { offset: offset1 }: Points,
  { offset: offset2 }: Points,
) => offset1 - offset2;

export const sortPoints = (points: Points[]) => {
  return points.sort(compare);
};

export const getLinearGradientBackgroundCss = (gradient: Gradient) => {
  const sortedPalette = sortPoints(gradient.points);
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
