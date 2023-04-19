import { Alpha, Gradient, Point, SaturationValue } from "../types/color";

/**
 * Get the alpha value from a given position on the alpha slider
 * @param {number} x The x coordinate on the alpha slider
 * @param {number} width The width of the alpha slider
 * @returns {number} The alpha based on the x position
 */
export function getAlphaFromPosition(x: number, width: number): number {
  if (!width) {
    return 0;
  }

  const percentage = x / width;
  const alpha = Math.max(Math.min(percentage, 1), 0);

  return alpha;
}

/**
 * Get the alpha display value
 */
export function getAlphaDisplayValueFromAlpha(alpha: Alpha, alphaSymbol: string): string {
  return `${Math.round(alpha * 100)}${alphaSymbol}`;
}

/**
 * Get the hue value from a given position on the hue slider
 * @param {number} x The x coordinate on the hue slider
 * @param {number} width The width of the hue slider
 * @returns {number} The hue based on the x position
 */
export function getHueFromPosition(x: number, width: number): number {
  if (!width) {
    return 0;
  }

  const percentage = x / width;
  const hue = Math.max(Math.min(percentage, 1), 0) * 360;

  return hue;
}

/**
 * Get the saturation and value from a given position on the SV slider
 * @param {number} x The x coordinate on the SV selector
 * @param {number} y The y coordinate on the SV selector
 * @param {number} width The width of the SV selector
 * @param {number} height The height of the SV selector
 * @returns {SaturationValue} The saturation and value based on the position
 */
export function getSaturationValueFromPosition(
  x: number,
  y: number,
  width: number,
  height: number,
): SaturationValue {
  const percentageX = !width ? 0 : x / width;
  const percentageY = !height ? 0 : 1 - y / height;

  const saturation = Math.max(Math.min(percentageX, 1), 0);
  const value = Math.max(Math.min(percentageY, 1), 0);

  return {
    saturation: saturation,
    value: value,
  };
}

/**
 * Get the color from EyeDropper API
 * @returns {string} Hex color
 */

export const openNativeEyeDropper = async () => {
  const abortController = new AbortController();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error this is new EyeDropper API
  const eyeDropper = new EyeDropper();

  try {
    const result = await eyeDropper.open({ signal: abortController.signal });
    return result.sRGBHex;
  } catch (e) {
    return null;
  }
};

export const sortPalettePoints = (points: Point[]) => points.sort(
  ({ offset: offset1 }: Point, { offset: offset2 }: Point) => offset1 - offset2,
);

export const getLinearGradientBackgroundCss = (gradient: Gradient) => {
  const _gradient = { ...gradient };
  const sortedPalette = sortPalettePoints([..._gradient.points]);
  const linearGradientColors = `linear-gradient(
    ${_gradient.degree}deg,
    ${sortedPalette
    .map(
      ({ alpha, offset, red, green, blue }) => `rgb(${red}, ${green}, ${blue}, ${alpha}) ${offset * 100}%`,
    )
    .join(", ")}
  )`;

  return linearGradientColors;
};

/**
 * Get random string
 */

export const getRandomString = () => Math.random().toString(36).substring(7);


export const noop = () => undefined;
