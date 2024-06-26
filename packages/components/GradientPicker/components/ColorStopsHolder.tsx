import { CSSProperties, memo, useMemo } from "react";

import {
  DEFAULT_PALETTE_HEIGHT,
  DEFAULT_PALETTE_WIDTH,
} from "../../../constants/gradientPicker";
import { StopHoldersProps } from "../../../types/gradientPicker";
import { ColorStop } from "./ColorStop";


export const ColorStopsHolder = memo(function ColorStopsHolder({
  stops,
  minStops,
  ...rest
}: StopHoldersProps) {

  const deleteDisabled = stops.length <= minStops;

  return (
    <div
      style={useMemo((): CSSProperties => ({
        width: DEFAULT_PALETTE_WIDTH,
        height: DEFAULT_PALETTE_HEIGHT,
        position: "relative",
      }), [])}
    >

      {stops.map((stop) => (
        <ColorStop
          key={stop.id}
          stop={stop}
          deleteDisabled={deleteDisabled}
          {...rest}
        />
      ))}

    </div>
  );

});
