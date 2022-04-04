/**
 * Saturation / Value of a color
 * @property {number} saturation The saturation of a color
 * @property {number} value The value of a color
 */
export declare type SaturationValue = {
    saturation: number;
    value: number;
};
/**
 * Get the hue value from a given position on the hue slider
 * @param {number} x The x coordinate on the hue slider
 * @param {number} width The width of the hue slider
 * @returns {number} The hue based on the x position
 */
export declare function getHueFromPosition(x: number, width: number): number;
/**
 * Get the alpha value from a given position on the alpha slider
 * @param {number} x The x coordinate on the alpha slider
 * @param {number} width The width of the alpha slider
 * @returns {number} The alpha based on the x position
 */
export declare function getAlphaFromPosition(x: number, width: number): number;
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
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/
export declare const applyPrefixToName: (prefix?: string | undefined) => (name: string) => string;
/**
 * Get the color from EyeDropper API
 * @returns {string} Hex color
 */
export declare const openNativeEyeDropper: () => Promise<any>;
