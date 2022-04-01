import { useState } from "react";

import ColorGradientPicker from "../../packages";
import { ColorValue, VALUE_COLOR_TYPE } from "../../packages/types";
import s from "./app.module.css";

function App() {
  const [color, setColor] = useState<ColorValue>({
    alpha: 100,
    hex: "#000",
    type: VALUE_COLOR_TYPE.SOLID,
  });

  console.log('color :>> ', color);

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
