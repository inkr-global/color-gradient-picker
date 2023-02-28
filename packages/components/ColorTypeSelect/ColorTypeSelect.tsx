import clsx from "clsx";

import { ColorType } from "../../ColorGradientPicker.types";
import s from "./ColorTypeSelect.module.css";


interface ColorTypeSelectProps {
  value: ColorType;
  onChange: (value: ColorType) => void;
  onClosePanel: () => void;
  colorSelectType?: ColorType | "all";
  draggableID?: string;
  theme?: "light" | "dark";
}

const ColorTypeSelect = ({
  value,
  onChange,
  colorSelectType,
  onClosePanel,
  draggableID,
  theme,
}: ColorTypeSelectProps) => (
  <div className={s.select_wrapper}>
    <select
      className={clsx(s.select, theme === "light" ? s.selectLight : s.selectDark, colorSelectType !== "all" && s.no_arrow)}
      value={value}
      onChange={(e) => {
        onChange(e.target.value as ColorType);
      }}
      style={{ width: value === "linear-gradient" ? 71 : 48 }}
      disabled={colorSelectType !== "all"}
    >
      <option value="solid">Solid</option>
      <option value="linear-gradient">Gradient</option>
    </select>
    {draggableID && (
      <div
        id={draggableID}
        style={{
          flexGrow: 1,
          height: "100%",
          cursor: "grab",
        }}
      />
    )}
    <button
      className={s.close_btn}
      onClick={onClosePanel}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.80926 8L12.9108 3.11094C12.9796 3.02969 12.9218 2.90625 12.8155 2.90625H11.5686C11.4952 2.90625 11.4249 2.93906 11.3764 2.99531L7.99363 7.02813L4.61082 2.99531C4.56394 2.93906 4.49363 2.90625 4.41863 2.90625H3.17176C3.06551 2.90625 3.00769 3.02969 3.07644 3.11094L7.17801 8L3.07644 12.8891C3.06104 12.9072 3.05116 12.9293 3.04798 12.9529C3.04479 12.9764 3.04843 13.0004 3.05846 13.022C3.0685 13.0435 3.08451 13.0617 3.10459 13.0745C3.12467 13.0872 3.14798 13.0939 3.17176 13.0938H4.41863C4.49207 13.0938 4.56238 13.0609 4.61082 13.0047L7.99363 8.97188L11.3764 13.0047C11.4233 13.0609 11.4936 13.0938 11.5686 13.0938H12.8155C12.9218 13.0938 12.9796 12.9703 12.9108 12.8891L8.80926 8Z"
          fill={`${theme === "light" ? "black" : "white"}`}
          fillOpacity="0.75"
        />
      </svg>

    </button>
  </div>
);

export default ColorTypeSelect;
