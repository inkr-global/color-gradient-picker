import { Alpha } from "../../../../colorTypes";

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
export function getAlphaDisplayValueFromAlpha(alpha: Alpha): string {
  return `${Math.round(alpha * 100)}%`;
}
