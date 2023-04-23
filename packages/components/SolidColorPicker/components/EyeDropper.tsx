import { ColorGradientPickerTheme } from "../../../types/colorGradientPicker";


interface EyeDropperProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  theme?: ColorGradientPickerTheme;
}

const EyeDropper = ({ onClick, theme }: EyeDropperProps) => {
  const titleColor = theme === "light" ? "black" : "white";
  const fillOpacity = theme === "light" ? "0.8" : "0.3";

  return (
    <button
      style={{
        outline: "none",
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        padding: 0,
        flexShrink: 0,
        marginRight: 4,
        height: "32px",
        width: "32px",
      }}
      onClick={onClick}
      type="button"
    >
      <svg
        width="12"
        height="13"
        viewBox="0 0 12 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.61333 11.6667L1.33333 10.3867L6.70667 5.00002L8 6.29335L2.61333 11.6667ZM11.8067 2.75335L10.2467 1.19335C10 0.933352 9.56667 0.933352 9.30667 1.19335L7.22667 3.27335L5.94 2.00002L5 2.94002L5.94667 3.88669L0 9.83335V13H3.16667L9.11333 7.05335L10.06 8.00002L11 7.06002L9.72 5.78002L11.8 3.70002C12.0667 3.43335 12.0667 3.00002 11.8067 2.75335Z"
          fill={titleColor}
          fillOpacity={fillOpacity}
        />
      </svg>
    </button>
  );
};

export default EyeDropper;
