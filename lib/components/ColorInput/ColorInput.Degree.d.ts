/// <reference types="react" />
import { Theme } from "../../types/colorGradientPicker";
import { ColorInputCoreProps } from "../../types/colorInput";
export declare function ColorInputDegree(props: Omit<ColorInputCoreProps, "onChange" | "info" | "value"> & {
    onChange: (value: number) => void;
    value: number;
    theme?: Theme;
}): JSX.Element;
