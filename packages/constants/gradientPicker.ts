import { ALPHA_VALUE_RANGE } from "./colorInput";


const STOP_WIDTH = 16;


export const HALF_STOP_WIDTH = STOP_WIDTH / 2;


export const DEFAULT_STOP_REMOVAL_DROP = 50;


export const DEFAULT_PALETTE_WIDTH = 258;


export const DEFAULT_PALETTE_HEIGHT = 22;


export const DEFAULT_MAX_STOPS = 10;


export const DEFAULT_MIN_STOPS = 2;


export const DEFAULT_PALETTE = [
  {
    id: 1,
    offset: 0,
    red: 0,
    green: 0,
    blue: 0,
    alpha: ALPHA_VALUE_RANGE.MAX,
  },
  {
    id: 2,
    offset: 1.0,
    red: 255,
    green: 255,
    blue: 255,
    alpha: ALPHA_VALUE_RANGE.MAX,
  },
];


export const DEFAULT_DEGREE = 90;


export const DEFAULT_GRADIENT = {
  degree: DEFAULT_DEGREE,
  points: DEFAULT_PALETTE,
};
