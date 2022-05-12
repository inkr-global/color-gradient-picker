/// <reference types="react" />
import { Gradient } from "../../types/color";
import { BaseInputProps } from "./types";
export declare function InputGradient(props: Omit<BaseInputProps, "onChange" | "info" | "value"> & {
    value?: Gradient;
}): JSX.Element;
