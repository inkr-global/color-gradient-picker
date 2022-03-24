import cn from "clsx";
import { useCallback, useState } from "react";

import s from "./ColorGradientPicker.module.css";
import Input from "./components/Input";
import { DEFAULT_CLASS_NAME } from "./constants";
import { ColorGradientPickerProps } from "./types";

function ColorGradientPicker(props: ColorGradientPickerProps) {
  // ------------------------------------------------------------------------------------------
  const { classNamePrefix = DEFAULT_CLASS_NAME, className } = props;

  // ------------------------------------------------------------------------------------------
  const [isActive, setActive] = useState<boolean>(false);

  const onShowPanel = useCallback(() => {
    setActive(true);
  }, []);

  const onHidePanel = useCallback(() => {
    setActive(false);
  }, [])

  return (
    <div className={cn(s.wrapper, classNamePrefix, className)}>
      <Input
        info={<Input.ColorPreview value="red" />}
        classNamePrefix={classNamePrefix}
        hasExtraInput
        onInputFocus={onShowPanel}
        onInputBlur={onHidePanel}
        onExtraInputFocus={onShowPanel}
        onExtraInputBlur={onHidePanel}
      />

      {isActive && (
        <div>Color panel</div>
      )}
    </div>
  );
}

export default ColorGradientPicker;
