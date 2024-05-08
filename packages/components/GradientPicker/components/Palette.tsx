import {
  DEFAULT_PALETTE_HEIGHT,
  DEFAULT_PALETTE_WIDTH,
} from "../../../constants/gradientPicker";
import { PalletteProps } from "../../../types/gradientPicker";
import { getLinearGradientBackgroundCss } from "../../../utils/common";


export function Palette(props: PalletteProps) {

  const { points, onAddColor, disabled } = props;


  // ------------------------------------------------------------------------------------------

  const linearGradientColors = getLinearGradientBackgroundCss({
    points: points,
    degree: 90, // the palette color should always show vertical gradient
  });


  // ------------------------------------------------------------------------------------------

  const handleColorAdd: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (e.button) return;

    const offset =
      e.clientX - (e.target as HTMLElement).getBoundingClientRect().left;
    onAddColor(offset);
  };


  // ------------------------------------------------------------------------------------------

  return (
    <div
      role="presentation"
      style={{
        width: DEFAULT_PALETTE_WIDTH,
        height: DEFAULT_PALETTE_HEIGHT,
        marginTop: 8,
        backgroundImage: linearGradientColors,
        cursor: (
          disabled ? "default" :
            "copy"
        ),
      }}
      onMouseDown={handleColorAdd}
    />
  );
}
