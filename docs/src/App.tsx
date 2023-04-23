import { useState } from "react";

import ColorGradientPicker from "../../packages";
import { ComponentColorValue } from "../../packages/types/colorGradientPicker";
import s from "./app.module.css";

function App() {
  const [color, setColor] = useState<ComponentColorValue>({
    alpha: 1,
    solid: "#000",
    type: "solid",
  });

  return (
    <div className={s.app}>
      <ColorGradientPicker
        color={color}
        onChange={(_color) => setColor(_color)}
        hasAlphaInput={false}
        // theme="dark"
      />
    </div>
  );
}

export default App;
