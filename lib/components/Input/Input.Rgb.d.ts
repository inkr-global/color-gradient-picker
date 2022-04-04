/// <reference types="react" />
import { InputProps } from "./types";
export declare function Rgb(props: Omit<InputProps, "onChange" | "value"> & {
    onChange: (value: number) => void;
    value: number;
}): JSX.Element;
