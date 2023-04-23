import { useState } from "react";

import ColorGradientPicker from "../../packages";
import {
  ALPHA_VALUE_RANGE,
  DEFAULT_COLOR_TYPE,
  DEFAULT_HEX_DARK,
} from "../../packages/constants/colorInput";
import { ColorGradientPickerValue } from "../../packages/types/colorGradientPicker";
import s from "./app.module.css";


function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [color, setColor] = useState<ColorGradientPickerValue>({
    alpha: ALPHA_VALUE_RANGE.MAX,
    solid: DEFAULT_HEX_DARK,
    type: DEFAULT_COLOR_TYPE,
  });

  return (
    <div className={`${s.app} ${theme === "dark" && s.app_dark}`}>
      <h1 className={s.title}>Color Gradient Picker</h1>

      <div className={s.selectWrapper}>
        <span>Theme</span>
        <select
          className={`${s.select} ${theme === "dark" && s.dark}`}
          value={theme}
          onChange={(e) => {
            setTheme(e.target.value as "light" | "dark");
          }}
        >
          <option value="light">Light</option>
          <option value="dark">dark</option>
        </select>
      </div>

      <ColorGradientPicker
        color={color}
        onChange={(_color) => setColor(_color)}
        hasAlphaInput={false}
        theme={theme}
      />
    </div>
  );
}

export default App;
