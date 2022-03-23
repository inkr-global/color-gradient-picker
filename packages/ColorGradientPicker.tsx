import cn from "clsx";

import s from "./ColorGradientPicker.module.css";
import Input from "./components/Input";
import { DEFAULT_CLASS_NAME } from "./constants";
import { ColorGradientPickerProps } from "./types";

function ColorGradientPicker(props: ColorGradientPickerProps) {
  const { classNamePrefix = DEFAULT_CLASS_NAME, className } = props;

  return (
    <div className={cn(s.wrapper, classNamePrefix, className)}>
      <Input
        label="HEX"
        info={<div>R</div>}
        classNamePrefix={classNamePrefix}
      />
    </div>
  );
}

export default ColorGradientPicker;
