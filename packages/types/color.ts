/**
 * @typedef {Object} Rgb
 * @property {number} red - The red component of the color (0 - 255)
 * @property {number} green - The green component of the color (0 - 255)
 * @property {number} blue - The blue component of the color (0 - 255)
 */
export interface Rgb {
  red: number;
  green: number;
  blue: number;
}


/**
 * @typedef {Object} Hsl
 * @property {number} hue - The hue of the color (0 - 360)
 * @property {number} saturation - The saturation the color (0.0 - 1.0)
 * @property {number} lightness - The lightness of the color (0.0 - 1.0)
 */
export interface Hsl {
  hue: number;
  saturation: number;
  lightness: number;
}


/**
 * @typedef {Object} Hsv
 * @property {number} hue - The hue of the color (0 - 360)
 * @property {number} saturation - The saturation the color (0.0 - 1.0)
 * @property {number} value - The value of the color (0.0 - 1.0)
 */
export interface Hsv {
  hue: number;
  saturation: number;
  value: number;
}


export interface Cmyk {
  cyan: number;
  magenta: number;
  yellow: number;
  black: number;
}


export interface Point {
  id?: number;
  red: number;
  green: number;
  blue: number;
  alpha: Alpha;
  offset: number;
}


export interface SaturationValue {
  saturation: number;
  value: number;
}


export interface Gradient {
  degree: number;
  points: Point[];
}


// Hex color: #000 or #fff ...
export type Hex = string;


// Alpha of the color (from 0.0 to 1.0)
export type Alpha = number;
