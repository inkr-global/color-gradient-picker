import { DEFAULT_PALETTE_WIDTH } from "../constants";
import { StopHoldersProps } from "../types";
import ColorStop from "./ColorStop/ColorStop";

const ColorStopsHolder = (props: StopHoldersProps) => {
  const { stops, ...rest } = props;

  return (
    <div
      style={{
        width: DEFAULT_PALETTE_WIDTH,
        height: 22,
        position: "relative",
      }}
    >
      {stops.map((stop) => (
        <ColorStop key={stop.id} stop={stop} {...rest} />
      ))}
    </div>
  );
};

export default ColorStopsHolder;
