import { Gradient, Point } from "../../colorTypes";


const compare = (
  { offset: offset1 }: Point,
  { offset: offset2 }: Point,
) => offset1 - offset2;

export const sortPoints = (points: Point[]) => points.sort(compare);

export const getLinearGradientBackgroundCss = (gradient: Gradient) => {
  const _gradient = { ...gradient };
  const sortedPalette = sortPoints([..._gradient.points]);
  const linearGradientColors = `linear-gradient(
    ${_gradient.degree}deg,
    ${sortedPalette.map(
    ({ alpha, offset, red, green, blue }) => `rgb(${red}, ${green}, ${blue}, ${alpha}) ${offset * 100}%`,
  )
    .join(", ")}
  )`;

  return linearGradientColors;
};

export const noop = () => undefined;
