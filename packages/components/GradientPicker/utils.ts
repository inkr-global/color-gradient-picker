import { PalletteColor } from "./types";

const compare = (
  { offset: offset1 }: PalletteColor,
  { offset: offset2 }: PalletteColor,
) => offset1 - offset2;

export const sortPalette = (palette: PalletteColor[]) => {
  console.log('palette :>> ', palette);

  return palette.sort(compare);
};

export const noop = () => undefined;
