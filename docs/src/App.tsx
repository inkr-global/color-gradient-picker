import { useState } from "react";

import ColorGradientPicker from "../../packages";
import { ColorValue } from "../../packages/ColorGradientPicker.types";
import s from "./app.module.css";

function App() {
  const [color, setColor] = useState<ColorValue>({
    alpha: 1,
    solid: "#000",
    type: "solid",
  });


  return (
    <div className={s.app}>
      <ColorGradientPicker
        color={color}
        onChange={(_color) => setColor(_color)}
      />
    </div>
  );
}

export default App;
