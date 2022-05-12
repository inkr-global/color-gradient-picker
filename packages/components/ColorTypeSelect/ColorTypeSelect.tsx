import clsx from "clsx";

import { ColorType } from "../../ColorGradientPicker.types";
import s from "./ColorTypeSelect.module.css";

interface ColorTypeSelectProps {
  value: ColorType;
  onChange: (value: ColorType) => void;
  onClosePanel: () => void;
  colorSelectType?: ColorType | "all";
  draggableID?: string;
}

const ColorTypeSelect = ({
  value,
  onChange,
  colorSelectType,
  onClosePanel,
  draggableID,
}: ColorTypeSelectProps) => (
  <div className={s.select_wrapper}>
    <select
      className={clsx(s.select, colorSelectType !== "all" && s.no_arrow)}
      value={value}
      onChange={(e) => {
        onChange(e.target.value as ColorType);
      }}
      style={{ width: value === "linear-gradient" ? 110 : 50 }}
      disabled={colorSelectType !== "all"}
    >
      <option value="solid">Solid</option>
      <option value="linear-gradient">Linear Gradient</option>
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
    <button className={s.close_btn} onClick={onClosePanel}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.92472 5.99919L11.6122 0.411686C11.6908 0.318829 11.6247 0.177757 11.5033 0.177757H10.0783C9.99437 0.177757 9.91401 0.215257 9.85865 0.279543L5.99258 4.88847L2.12651 0.279543C2.07294 0.215257 1.99258 0.177757 1.90687 0.177757H0.481867C0.360439 0.177757 0.294367 0.318829 0.372939 0.411686L5.06044 5.99919L0.372939 11.5867C0.355338 11.6074 0.344047 11.6327 0.340404 11.6596C0.336762 11.6865 0.340922 11.7139 0.352391 11.7386C0.36386 11.7632 0.382156 11.784 0.405107 11.7986C0.428057 11.8131 0.454698 11.8208 0.481867 11.8206H1.90687C1.9908 11.8206 2.07115 11.7831 2.12651 11.7188L5.99258 7.1099L9.85865 11.7188C9.91222 11.7831 9.99258 11.8206 10.0783 11.8206H11.5033C11.6247 11.8206 11.6908 11.6795 11.6122 11.5867L6.92472 5.99919Z"
          fill="white"
          fillOpacity="0.45"
        />
      </svg>
    </button>
  </div>
);

export default ColorTypeSelect;
