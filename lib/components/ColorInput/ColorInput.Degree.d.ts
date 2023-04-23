/// <reference types="react" />
import { ColorGradientPickerTheme } from "../../types/colorGradientPicker";
import { ColorInputCoreProps } from "../../types/colorInput";
export declare function ColorInputDegree(props: Omit<ColorInputCoreProps, "onChange" | "info" | "value"> & {
    onChange: (value: number) => void;
    value: number;
    theme?: ColorGradientPickerTheme;
}): JSX.Element;
