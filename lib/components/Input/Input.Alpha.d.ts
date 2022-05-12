/// <reference types="react" />
import { BaseInputProps } from "./types";
export declare function InputAlpha(props: Omit<BaseInputProps, "onChange" | "info" | "value"> & {
    onChange: (value: number) => void;
    value: number;
}): JSX.Element;
