import { InputProps } from "./types";
export declare function Hex(props: Omit<InputProps, "onChange" | "info" | "value"> & {
    onChange: (value: string) => void;
    value: string;
}): JSX.Element;
