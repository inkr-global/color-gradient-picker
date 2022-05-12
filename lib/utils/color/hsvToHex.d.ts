/**
 * Takes given hue, saturation and value and returns the hex color representation
 * @param {number} hue The hue of the color (0.0 - 360.0)
 * @param {number} saturation The saturation of the color (0.0 - 1.0)
 * @param {number} value The value of the color (0.0 - 1.0)
 * @returns {string} The hex string representation of the color
 */
export default function hsvToHex(hue: number, saturation: number, value: number): string;
