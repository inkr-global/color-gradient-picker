/**
 * Saturation / Value of a color
 * @property {number} saturation The saturation of a color
 * @property {number} value The value of a color
 */
export type SaturationValue = {
  saturation: number;
  value: number;
};

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
  const alpha = Math.max(Math.min(percentage, 1), 0) * 100;

  return Math.round(alpha);
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
    saturation,
    value,
  };
}

/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/
export const applyPrefixToName = (prefix?: string) => (name: string) => {
  if (!prefix) {
    return name;
  } else if (name[0] === "-") {
    return prefix + name;
  } else {
    return prefix + "__" + name;
  }
};

/**
 * Get the color from EyeDropper API
 * @returns {string} Hex color
 */

export const openNativeEyeDropper = async () => {
  const abortController = new AbortController();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore this is new EyeDropper API
  const eyeDropper = new EyeDropper();

  try {
    const result = await eyeDropper.open({ signal: abortController.signal });
    return result.sRGBHex;
  } catch (e) {
    return null;
  }
};
