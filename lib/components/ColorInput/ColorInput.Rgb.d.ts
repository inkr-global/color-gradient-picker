/// <reference types="react" />
import { ColorInputCoreProps } from "../../types/colorInput";
export declare function ColorInputRgb(props: Omit<ColorInputCoreProps, "onChange" | "value"> & {
    onChange: (value: number) => void;
    value: number;
}): JSX.Element;
