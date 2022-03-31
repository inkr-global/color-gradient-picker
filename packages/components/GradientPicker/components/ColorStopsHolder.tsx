import { StopHoldersProps } from "../types";
import ColorStop from "./ColorStop/ColorStop";

const ColorStopsHolder = (props: StopHoldersProps) => {
  const { width, stops, disabled = false, onAddColor, ...rest } = props;

  const handleColorAdd: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();

    if (e.button) return;

    const offset = e.clientX - e.target.getBoundingClientRect().left;
    onAddColor(offset);
  };

  return (
    <div
      className="csh"
      style={{
        width,
        height: 17,
        position: "relative",
        cursor: disabled ? "default" : "crosshair",
      }}
      onMouseDown={handleColorAdd}
    >
      {stops.map((stop) => (
        <ColorStop key={stop.id} stop={stop} {...rest} />
      ))}
    </div>
  );
};

export default ColorStopsHolder;
