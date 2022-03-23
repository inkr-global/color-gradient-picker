import React from "react";

import s from "./app.module.css";

// TODO: move to package.json
// eslint-disable-next-line import/no-relative-packages
import ColorGradientPicker from "../../packages";

function App() {
  return (
    <div className={s.app}>
      <ColorGradientPicker />
    </div>
  );
}

export default App;
