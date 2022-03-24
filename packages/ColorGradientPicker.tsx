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
        info={<Input.ColorPreview value="red" />}
        classNamePrefix={classNamePrefix}
      />

      <hr />
      <Input
        label="RGB"
        info={<Input.InputTextInfo>R</Input.InputTextInfo>}
        classNamePrefix={classNamePrefix}
        hasExtraInput
      />
      <Input
        info={<Input.InputTextInfo>G</Input.InputTextInfo>}
        classNamePrefix={classNamePrefix}
      />
      <Input
        info={<Input.InputTextInfo>B</Input.InputTextInfo>}
        classNamePrefix={classNamePrefix}
      />

      
    </div>
  );
}

export default ColorGradientPicker;
