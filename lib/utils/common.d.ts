import { Alpha, Gradient, Point, SaturationValue } from "../types/color";
/**
 * Get the alpha value from a given position on the alpha slider
 * @param {number} x The x coordinate on the alpha slider
 * @param {number} width The width of the alpha slider
 * @returns {number} The alpha based on the x position
 */
export declare function getAlphaFromPosition(x: number, width: number): number;
/**
 * Get the alpha display value
 */
export declare function getAlphaDisplayValueFromAlpha(alpha: Alpha, alphaSymbol: string): string;
/**
 * Get the hue value from a given position on the hue slider
 * @param {number} x The x coordinate on the hue slider
 * @param {number} width The width of the hue slider
 * @returns {number} The hue based on the x position
 */
export declare function getHueFromPosition(x: number, width: number): number;
/**
 * Get the saturation and value from a given position on the SV slider
 * @param {number} x The x coordinate on the SV selector
 * @param {number} y The y coordinate on the SV selector
 * @param {number} width The width of the SV selector
 * @param {number} height The height of the SV selector
 * @returns {SaturationValue} The saturation and value based on the position
 */
export declare function getSaturationValueFromPosition(x: number, y: number, width: number, height: number): SaturationValue;
/**
 * Get the color from EyeDropper API
 * @returns {string} Hex color
 */
export declare const openNativeEyeDropper: () => Promise<any>;
export declare const sortPalettePoints: (points: Point[]) => Point[];
export declare const getLinearGradientBackgroundCss: (gradient: Gradient) => string;
/**
 * Get random string
 */
export declare const getRandomString: () => string;
export declare const noop: () => undefined;
