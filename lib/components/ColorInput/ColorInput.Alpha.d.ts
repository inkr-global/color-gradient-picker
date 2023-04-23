/// <reference types="react" />
import { ColorInputCoreProps } from "../../types/colorInput";
export declare function ColorInputAlpha(props: Omit<ColorInputCoreProps, "onChange" | "info" | "value"> & {
    onChange: (value: number) => void;
    value: number;
}): JSX.Element;
