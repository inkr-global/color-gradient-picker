import { useState } from "react";

import ColorGradientPicker from "../../packages";
import { ColorValue } from "../../packages/types";
import s from "./app.module.css";

function App() {
  const [color, setColor] = useState<ColorValue>({
    alpha: 100,
    hex: "#000",
  });

  return (
    <div className={s.app}>
      <ColorGradientPicker
        value={color}
        onChange={(_color) => setColor(_color)}
      />
    </div>
  );
}

export default App;
