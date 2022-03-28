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
