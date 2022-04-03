import { useState } from "react";

import ColorGradientPicker from "../../packages";
import { COLOR_TYPE,ColorValue } from "../../packages/types";
import s from "./app.module.css";

function App() {
  const [color, setColor] = useState<ColorValue>({
    alpha: 100,
    solid: "#000",
    type: COLOR_TYPE.SOLID,
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
