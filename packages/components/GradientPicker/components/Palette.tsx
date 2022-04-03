import { DEFAULT_PALETTE_HEIGHT, DEFAULT_PALETTE_WIDTH } from "../constants";
import { PalletteProps } from "../types";
import { sortPalette } from "../utils";

const Palette = (props: PalletteProps) => {
  const { palette, degree, onAddColor, disabled } = props;

  // ------------------------------------------------------------------------------------------
  const sortedPalette = sortPalette(palette);
  const linearGradientColors = `linear-gradient(
    ${degree}deg,
    ${sortedPalette
      .map(
        ({ alpha, offset, color: { red, green, blue } }) =>
          `rgb(${red}, ${green}, ${blue}, ${alpha}) ${offset * 100}%`,
      )
      .join(", ")}
  )`;

  // ------------------------------------------------------------------------------------------

  const handleColorAdd: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (e.button) return;

    const offset = e.clientX - e.target.getBoundingClientRect().left;
    onAddColor(offset);
  };

  return (
    <div
      style={{
        width: DEFAULT_PALETTE_WIDTH,
        height: DEFAULT_PALETTE_HEIGHT,
        marginTop: 8,
        backgroundImage: linearGradientColors,
        cursor: disabled ? "default" : "copy",
      }}
      onMouseDown={handleColorAdd}
    />
  );
};

export default Palette;
