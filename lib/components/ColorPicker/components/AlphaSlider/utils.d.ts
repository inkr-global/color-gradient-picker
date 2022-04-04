import { Alpha } from "../../../../colorTypes";
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
export declare function getAlphaDisplayValueFromAlpha(alpha: Alpha): string;
