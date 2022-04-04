import { Rgb } from './colorTypes';
/**
 * Takes given hue, saturation and value and returns the respective RGB values
 * @param {number} hue The hue of the color (0.0 - 360.0)
 * @param {number} saturation The saturation of the color (0.0 - 1.0)
 * @param {number} value The value of the color (0.0 - 1.0)
 * @returns {Rgb} The RGB values for the color
 */
export default function hsvToRgb(hue: number, saturation: number, value: number): Rgb;
