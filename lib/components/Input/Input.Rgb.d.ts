/// <reference types="react" />
import { BaseInputProps } from "./types";
export declare function InputRgb(props: Omit<BaseInputProps, "onChange" | "value"> & {
    onChange: (value: number) => void;
    value: number;
}): JSX.Element;
