/// <reference types="react" />
import { InputProps } from "./types";
export declare function Degree(props: Omit<InputProps, "onChange" | "info" | "value"> & {
    onChange: (value: number) => void;
    value: number;
}): JSX.Element;
