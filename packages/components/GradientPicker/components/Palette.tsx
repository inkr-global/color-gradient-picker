import { DEFAULT_PALETTE_HEIGHT, DEFAULT_PALETTE_WIDTH } from "../constants";
import { PalletteProps } from "../types";
import { getLinearGradientBackgroundCss } from "../utils";

const Palette = (props: PalletteProps) => {
  const { points, degree, onAddColor, disabled } = props;

  // ------------------------------------------------------------------------------------------
  const linearGradientColors = getLinearGradientBackgroundCss({
    points,
    degree,
  });

  // ------------------------------------------------------------------------------------------

  const handleColorAdd: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (e.button) return;

    const offset = e.clientX - (e.target as HTMLElement).getBoundingClientRect().left;
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
